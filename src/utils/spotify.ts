'use client';

import axios from 'axios';

const EXPIRATION_TIME = 3600 * 1000; // 1 hour in milliseconds

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

// Refresh token function
const refreshAccessToken = async () => {
    try {
        const { data } = await axios.get(`/api/refresh_token?refresh_token=${getLocalRefreshToken()}`);
        const { access_token } = data;
        setLocalAccessToken(access_token);
        window.location.reload();
    } catch (e) {
        console.error(e);
    }
};

// Get access token
export const getAccessToken = () => {
    // Only run on client side
    if (typeof window === 'undefined') return null;

    const params = new URLSearchParams(window.location.hash.substring(1));
    const error = params.get('error');
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');

    if (error) {
        console.error(error);
        refreshAccessToken();
    }

    // Check token expiration
    if (getTokenTimestamp() && Date.now() - Number(getTokenTimestamp()) > EXPIRATION_TIME) {
        console.warn('Access token has expired, refreshing...');
        refreshAccessToken();
    }

    const localAccessToken = getLocalAccessToken();

    if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
        setLocalAccessToken(access_token);
        if (refresh_token) setLocalRefreshToken(refresh_token);
        return access_token;
    }

    return localAccessToken;
};

export const logout = () => {
    window.localStorage.removeItem('spotify_token_timestamp');
    window.localStorage.removeItem('spotify_access_token');
    window.localStorage.removeItem('spotify_refresh_token');
    window.location.reload();
}; 