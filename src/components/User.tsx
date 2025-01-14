import { useSpotifyData } from '@/hooks/useSpotifyData';
import { Sidebar } from './Sidebar/Sidebar';
import { ProfileHeader } from './Profile/ProfileHeader';
import { TopArtists } from './Profile/TopArtists';
import { TopTracks } from './Profile/TopTracks';
import { LoadingSpinner } from './UI/LoadingSpinner';
import { ErrorMessage } from './UI/ErrorMessage';
import { logout } from '@/utils/spotify';

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
  if (!profile) logout();

  return (
    <div className="flex min-h-screen bg-spotify-black">
      <Sidebar />
      <main className="flex-1 ml-32 mr-16">
        <div className="max-w-[1400px] px-4 py-8 lg:px-[20px] lg:py-[40px] md:px-3 md:py-6 sm:px-2 sm:py-4">
          <ProfileHeader
            profile={profile!}
            following={following!}
            playlistsCount={playlistsCount!}
          />
          <section className="w-full flex sm:flex-row flex-col items-start gap-[70px] mt-[100px]">
            <div className="sm:flex-1 min-w-0 ">
              <TopArtists artists={topArtists} />
            </div>
            <div className="sm:flex-1 min-w-0 sm:mt-0 mt-[70px] ">
              <TopTracks tracks={topTracks} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
