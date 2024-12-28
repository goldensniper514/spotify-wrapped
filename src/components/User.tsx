import { useSpotifyData } from '@/hooks/useSpotifyData';
import { ProfileHeader } from './Profile/ProfileHeader';
import { TopArtists } from './Profile/TopArtists';
import { TopTracks } from './Profile/TopTracks';
import { LoadingSpinner } from './UI/LoadingSpinner';
import { ErrorMessage } from './UI/ErrorMessage';

export default function User() {
  const {
    profile,
    topArtists,
    topTracks,
    loading,
    error,
    following,
    playlistsCount,
  } = useSpotifyData();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!profile) return null;

  return (
    <div className="max-w-[1400px] mx-auto px-20 py-20 lg:px-[50px] lg:py-[60px] md:px-10 md:py-[50px] sm:px-6 sm:py-[30px]">
      <ProfileHeader
        profile={profile}
        following={following}
        playlistsCount={playlistsCount}
      />

      <section className="w-full grid grid-cols-2 gap-[70px] mt-[100px] md:block md:mt-[70px]">
        <TopArtists artists={topArtists} />
        <TopTracks tracks={topTracks} />
      </section>
    </div>
  );
}
