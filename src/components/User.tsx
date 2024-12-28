import { useEffect, useState } from 'react';
import {
  getUserProfile,
  getTopArtists,
  getTopTracks,
  getFollowing,
  getPlaylists,
} from '@/utils/spotifyApi';
import Image from 'next/image';
import { UserIcon } from '@heroicons/react/24/solid';

interface UserProfile {
  display_name: string;
  images: { url: string }[];
  followers: { total: number };
  external_urls: { spotify: string };
}

interface Artist {
  name: string;
  images: { url: string }[];
  external_urls: { spotify: string };
}

interface Track {
  name: string;
  artists: { name: string }[];
  album: {
    name: string;
    images: { url: string }[];
  };
  external_urls: { spotify: string };
  duration_ms: number;
}

export default function User() {
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
        const [
          profileData,
          artistsData,
          tracksData,
          followingData,
          playlistsData,
        ] = await Promise.all([
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading profile...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-20 py-20 lg:px-[50px] lg:py-[60px] md:px-10 md:py-[50px] sm:px-6 sm:py-[30px]">
      {/* Header Section */}
      <header className="flex flex-col items-center justify-center relative">
        <div className="w-[150px] h-[150px] relative">
          {profile?.images[0] ? (
            <Image
              src={profile.images[0].url}
              alt={profile.display_name}
              fill
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-full h-full rounded-full border-2 border-current p-[30px] flex items-center justify-center">
              <UserIcon className="w-full h-full" />
            </div>
          )}
        </div>

        <div className="mt-5 text-center">
          <a
            href={profile?.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#1ed760] transition-colors"
          >
            <h1 className="text-[50px] font-[900] mt-5 mb-0 md:text-[40px] sm:text-[8vw]">
              {profile?.display_name}
            </h1>
          </a>
        </div>

        <div className="grid grid-cols-3 gap-[30px] mt-5">
          <div className="text-center">
            <div className="text-[#1DB954] font-bold text-[20px]">
              {profile?.followers.total}
            </div>
            <p className="text-[#9B9B9B] text-xs uppercase tracking-[1px] mt-[5px]">
              Followers
            </p>
          </div>
          <div className="text-center">
            <div className="text-[#1DB954] font-bold text-[20px]">
              {following}
            </div>
            <p className="text-[#9B9B9B] text-xs uppercase tracking-[1px] mt-[5px]">
              Following
            </p>
          </div>
          <div className="text-center">
            <div className="text-[#1DB954] font-bold text-[20px]">
              {playlistsCount}
            </div>
            <p className="text-[#9B9B9B] text-xs uppercase tracking-[1px] mt-[5px]">
              Playlists
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="mt-[30px] px-[30px] py-3 border border-white rounded-[30px] text-xs font-bold tracking-[1px] uppercase text-center 
          hover:bg-white hover:text-black transition-all duration-250"
        >
          Logout
        </button>
      </header>

      {/* Preview Section */}
      <section className="w-full grid grid-cols-2 gap-[70px] mt-[100px] md:block md:mt-[70px]">
        {/* Top Artists */}
        <div className="md:last:mt-[50px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Top Artists of All Time</h3>
            <button className="text-sm text-white bg-[#282828] hover:bg-[#3E3E3E] px-4 py-1 rounded-full">
              SEE MORE
            </button>
          </div>

          <div>
            <ul className="space-y-2">
              {topArtists.map((artist, i) => (
                <li key={i}>
                  <a
                    href={artist.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-md hover:bg-[#282828] transition-colors group h-[64px]" // Added fixed height
                  >
                    <div className="relative w-[48px] h-[48px] flex-shrink-0">
                      {' '}
                      {/* Added flex-shrink-0 */}
                      <Image
                        src={artist.images[0].url}
                        alt={artist.name}
                        width={48}
                        height={48}
                        className="rounded object-cover" // Added object-cover
                      />
                    </div>
                    <div className="flex-grow min-w-0">
                      {' '}
                      {/* Added min-w-0 to enable text truncation */}
                      <div className="text-sm font-medium truncate">
                        {artist.name}
                      </div>
                      <div className="text-sm text-zinc-400">Artist</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top Tracks */}
        <div className="md:last:mt-[50px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Top Tracks of All Time</h3>
            <button className="text-sm text-white bg-[#282828] hover:bg-[#3E3E3E] px-4 py-1 rounded-full">
              SEE MORE
            </button>
          </div>

          <div>
            <ul className="space-y-2">
              {topTracks.map((track, i) => (
                <li key={i}>
                  <a
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-md hover:bg-[#282828] transition-colors group h-[64px]"
                  >
                    <div className="relative w-[48px] h-[48px] flex-shrink-0">
                      <Image
                        src={track.album.images[0].url}
                        alt={track.name}
                        width={48}
                        height={48}
                        className="rounded object-cover"
                      />
                    </div>
                    <div className="flex-grow min-w-0 flex justify-between items-center">
                      <div className="min-w-0 flex-grow">
                        <div className="text-sm font-medium truncate">
                          {track.name}
                        </div>
                        <div className="text-sm text-zinc-400 truncate">
                          {track.artists.map(a => a.name).join(', ')} •{' '}
                          {track.album.name}
                        </div>
                      </div>
                      <div className="text-sm text-zinc-400 flex-shrink-0 ml-4">
                        {formatDuration(track.duration_ms)}
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
