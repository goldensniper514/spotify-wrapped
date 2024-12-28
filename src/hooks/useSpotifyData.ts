import { useState, useEffect } from 'react';
import { UserProfile, Artist, Track } from '@/types/spotify';
import {
    getUserProfile,
    getTopArtists,
    getTopTracks,
    getFollowing,
    getPlaylists,
} from '@/utils/spotifyApi';

export function useSpotifyData() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [topArtists, setTopArtists] = useState<Artist[]>([]);
    const [topTracks, setTopTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [following, setFollowing] = useState<number | null>(null);
    const [playlistsCount, setPlaylistsCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [profileData, artistsData, tracksData, followingData, playlistsData] =
                    await Promise.all([
                        getUserProfile(),
                        getTopArtists('long_term'),
                        getTopTracks('long_term'),
                        getFollowing(),
                        getPlaylists(),
                    ]);

                setProfile(profileData.user);
                setTopArtists(artistsData.data.items.slice(0, 10));
                setTopTracks(tracksData.data.items.slice(0, 10));
                setFollowing(profileData?.following?.artists?.items?.length);
                setPlaylistsCount(playlistsData?.data?.items?.length);
            } catch (err) {
                setError('Failed to load profile data');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { profile, topArtists, topTracks, loading, error, following, playlistsCount };
} 