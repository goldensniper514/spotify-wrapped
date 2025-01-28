'use client';

import axios from 'axios';

const EXPIRATION_TIME = 3600 * 1000; // 1 hour in milliseconds
const SPOTIFY_AUTHORIZE_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-follow-read',
  'user-read-recently-played',
  'playlist-read-private',
  'playlist-read-collaborative',
].join(' ');

// Token Management
const setTokenTimestamp = () => {
  window.localStorage.setItem('spotify_token_timestamp', Date.now().toString());
};

const setLocalAccessToken = (token: string) => {
  setTokenTimestamp();
  window.localStorage.setItem('spotify_access_token', token);
};

const setLocalRefreshToken = (token: string) => {
  window.localStorage.setItem('spotify_refresh_token', token);
};

const getTokenTimestamp = () => {
  return window.localStorage.getItem('spotify_token_timestamp');
};

const getLocalAccessToken = () => {
  return window.localStorage.getItem('spotify_access_token');
};

const getLocalRefreshToken = () => {
  return window.localStorage.getItem('spotify_refresh_token');
};

// // Refresh token function
// const refreshAccessToken = async () => {
//     try {
//         const { data } = await axios.get(`/api/refresh_token?refresh_token=${getLocalRefreshToken()}`);
//         const { access_token } = data;
//         setLocalAccessToken(access_token);
//         window.location.reload();
//     } catch (e) {
//         console.error(e);
//     }
// };

// Add this new function to handle token refresh
const refreshTokenAndRetry = async () => {
  try {
    const { data } = await axios.get(`/api/refresh_token?refresh_token=${getLocalRefreshToken()}`);
    const { access_token } = data;
    setLocalAccessToken(access_token);
    return access_token;
  } catch (e) {
    console.error('Error refreshing token:', e);
    logout(); // Force logout if refresh fails
    return null;
  }
};

// Updated getAccessToken to handle async refresh
export const getAccessToken = async () => {
  if (typeof window === 'undefined') return null;

  const localAccessToken = getLocalAccessToken();

  // Check if token is expired
  if (getTokenTimestamp() && Date.now() - Number(getTokenTimestamp()) > EXPIRATION_TIME) {
    console.warn('Access token has expired, refreshing...');
    return await refreshTokenAndRetry();
  }

  if (!localAccessToken || localAccessToken === 'undefined') {
    // Handle initial token from URL if present
    const params = new URLSearchParams(window.location.hash.substring(1));
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');

    if (access_token) {
      setLocalAccessToken(access_token);
      if (refresh_token) setLocalRefreshToken(refresh_token);
      return access_token;
    }

    return null;
  }

  return localAccessToken;
};

export const logout = () => {
  window.localStorage.removeItem('spotify_token_timestamp');
  window.localStorage.removeItem('spotify_access_token');
  window.localStorage.removeItem('spotify_refresh_token');
  window.location.href = '/'; // Redirect to home instead of login directly
};

export const loginUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!,
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI!,
    scope: SCOPES,
    response_type: 'code',
    show_dialog: 'true'
  });

  return `${SPOTIFY_AUTHORIZE_ENDPOINT}?${params.toString()}`;
};
