import axios from 'axios';
import { getAccessToken } from './spotify';

// Export getHeaders function
const getHeaders = async () => {
    const token = await getAccessToken();
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

// User Profile
export const getUser = async () => {
    try {
        const headers = await getHeaders();
        return axios.get('https://api.spotify.com/v1/me', { headers });
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
            // Token expired during request, refresh and retry once
            const newHeaders = await getHeaders();
            return axios.get('https://api.spotify.com/v1/me', { headers: newHeaders });
        }
        throw error;
    }
};

// Following
export const getFollowing = async () => {
    const headers = await getHeaders();
    return axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers });
};

// Playlists
export const getPlaylists = async () => {
    const headers = await getHeaders();
    return axios.get('https://api.spotify.com/v1/me/playlists', { headers });
};

// Recently Played
export const getRecentlyPlayed = async () => {
    const headers = await getHeaders();
    return axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers });
};

// Top Artists
export const getTopArtists = async (timeRange = 'long_term') => {
    const headers = await getHeaders();
    return axios.get(`https://api.spotify.com/v1/me/top/artists?time_range=${timeRange}`, { headers });
};

// Top Tracks
export const getTopTracks = async (timeRange = 'long_term') => {
    const headers = await getHeaders();
    return axios.get(`https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}`, { headers });
};

// Combined user info fetch
export const getUserProfile = async () => {
    try {
        const [user, following, playlists, recentlyPlayed] = await Promise.all([
            getUser(),
            getFollowing(),
            getPlaylists(),
            getRecentlyPlayed()
        ]);

        return {
            user: user.data,
            following: following.data,
            playlists: playlists.data,
            recentlyPlayed: recentlyPlayed.data
        };
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};
