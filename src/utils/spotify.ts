'use client';

import axios from 'axios';

const EXPIRATION_TIME = 3600 * 1000; // 1 hour in milliseconds

export const getHashParams = () => {
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    return {
        access_token: hashParams.get('access_token'),
        refresh_token: hashParams.get('refresh_token'),
        error: hashParams.get('error')
    };
};

export const setTokenTimestamp = () => {
    window.localStorage.setItem('spotify_token_timestamp', Date.now().toString());
};

export const setLocalAccessToken = (token: string) => {
    setTokenTimestamp();
    window.localStorage.setItem('spotify_access_token', token);
};

export const setLocalRefreshToken = (token: string) => {
    window.localStorage.setItem('spotify_refresh_token', token);
};

export const getLocalAccessToken = () => {
    return window.localStorage.getItem('spotify_access_token');
};

export const getLocalRefreshToken = () => {
    return window.localStorage.getItem('spotify_refresh_token');
};

export const refreshAccessToken = async () => {
    try {
        const refreshToken = getLocalRefreshToken();
        const response = await fetch(`/api/refresh_token?refresh_token=${refreshToken}`);
        const data = await response.json();
        const { access_token } = data;
        setLocalAccessToken(access_token);
        window.location.reload();
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
};

export const getAccessToken = () => {
    const { error, access_token, refresh_token } = getHashParams();

    if (error) {
        console.error('Error getting access token:', error);
        refreshAccessToken();
        return null;
    }

    // Check if token has expired
    const tokenTimestamp = window.localStorage.getItem('spotify_token_timestamp');
    if (tokenTimestamp && Date.now() - Number(tokenTimestamp) > EXPIRATION_TIME) {
        console.warn('Access token has expired, refreshing...');
        refreshAccessToken();
        return null;
    }

    const localAccessToken = getLocalAccessToken();

    // If no local token but we have a new one in params, set it
    if ((!localAccessToken || localAccessToken === 'undefined') && access_token) {
        setLocalAccessToken(access_token);
        if (refresh_token) {
            setLocalRefreshToken(refresh_token);
        }
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