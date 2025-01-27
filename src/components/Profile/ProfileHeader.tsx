import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

interface ProfileHeaderProps {
  profile: {
    display_name: string;
    images: { url: string }[];
    followers: { total: number };
    external_urls: { spotify: string };
  };
  following: number;
  playlistsCount: number;
}

export function ProfileHeader({
  profile,
  following,
  playlistsCount,
}: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center justify-center relative">
      {/* Avatar */}
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

      {/* Username */}
      <div className="mt-5 text-center">
        <a
          href={profile?.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[#1ed760] transition-colors"
        >
          <h1 className="text-[50px] font-bold mt-5 mb-0 md:text-[40px] sm:text-[8vw]">
            {profile?.display_name}
          </h1>
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-[30px] mt-5 w-full max-w-[400px]">
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
          <Link href="/playlists" className="group">
            <div className="text-[#1DB954] font-bold text-[20px] group-hover:text-[#1ed760] transition-colors">
              {playlistsCount}
            </div>
            <p className="text-[#9B9B9B] text-xs uppercase tracking-[1px] mt-[5px] group-hover:text-white transition-colors">
              Playlists
            </p>
          </Link>
        </div>
      </div>

      {/* Logout Button */}
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
  );
}
