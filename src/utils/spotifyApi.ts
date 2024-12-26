import axios from 'axios';
import { getAccessToken } from './spotify';

export const getHeaders = () => {
    const token = getAccessToken();
    return {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

// User Profile
export const getUser = () =>
    axios.get('https://api.spotify.com/v1/me', { headers: getHeaders() });

// Following
export const getFollowing = () =>
    axios.get('https://api.spotify.com/v1/me/following?type=artist', { headers: getHeaders() });

// Playlists
export const getPlaylists = () =>
    axios.get('https://api.spotify.com/v1/me/playlists', { headers: getHeaders() });

// Recently Played
export const getRecentlyPlayed = () =>
    axios.get('https://api.spotify.com/v1/me/player/recently-played', { headers: getHeaders() });

// Top Artists
export const getTopArtists = (timeRange: 'short_term' | 'medium_term' | 'long_term') =>
    axios.get(`https://api.spotify.com/v1/me/top/artists?limit=50&time_range=${timeRange}`, { headers: getHeaders() });

// Top Tracks
export const getTopTracks = (timeRange: 'short_term' | 'medium_term' | 'long_term') =>
    axios.get(`https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=${timeRange}`, { headers: getHeaders() });

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