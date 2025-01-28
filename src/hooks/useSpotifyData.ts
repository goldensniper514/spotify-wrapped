import { Artist, Track, UserProfile } from '@/types/spotify';
import { getAccessToken, loginUrl } from '@/utils/spotify';
import {
  getPlaylists,
  getTopArtists,
  getTopTracks,
  getUserProfile,
} from '@/utils/spotifyApi';
import axios from 'axios';
import { useEffect, useState } from 'react';

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
        const token = await getAccessToken();
        if (!token) {
          window.location.href = loginUrl();
          return;
        }

        const [profileData, artistsData, tracksData,playlistsData] =
          await Promise.all([
            getUserProfile(),
            getTopArtists('long_term'),
            getTopTracks('long_term'),
            getPlaylists(),
          ]);

        setProfile(profileData.user);
        setTopArtists(artistsData.data.items.slice(0, 10));
        setTopTracks(tracksData.data.items.slice(0, 10));
        setFollowing(profileData?.following?.artists?.items?.length);
        setPlaylistsCount(playlistsData?.data?.items?.length);
      } catch (err) {
        console.error(err);

        if (axios.isAxiosError(err) && (err.response?.status === 401 || err.response?.status === 403)) {
          window.location.href = loginUrl();
          return;
        }

        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { profile, topArtists, topTracks, loading, error, following, playlistsCount };
}
