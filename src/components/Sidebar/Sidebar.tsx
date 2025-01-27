"use client";

import { NavLink } from "./NavLink";
import IconSpotify from "@/icons/spotify";
import IconGithub from "@/icons/github";
import IconUser from "@/icons/user";
import IconMicrophone from "@/icons/microphone";
import IconMusic from "@/icons/music";
import IconTime from "@/icons/time";
import IconPlaylist from "@/icons/playlist";

export function Sidebar() {
  return (
    <>
      {/* Desktop Slim Sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[120px] bg-black/95 sm:block">
        <div className="flex h-full flex-col">
          {/* Top section with Spotify logo */}
          <div className="flex justify-center py-6">
            <div className="h-[42px] w-[42px] cursor-pointer text-[#1DB954] transition-colors hover:text-[#1ed760]">
              <IconSpotify />
            </div>
          </div>

          {/* Navigation section - centered between logo and github */}
          <div className="flex flex-1 flex-col justify-center">
            <nav className="flex flex-col">
              <NavLink href="/profile" icon={IconUser} label="Profile" />
              <NavLink
                href="/top-artists"
                icon={IconMicrophone}
                label="Top Artists"
              />
              <NavLink href="/top-tracks" icon={IconMusic} label="Top Tracks" />
              <NavLink href="/recent" icon={IconTime} label="Recent" />
              <NavLink
                href="/playlists"
                icon={IconPlaylist}
                label="Playlists"
              />
            </nav>
          </div>

          {/* Bottom section with Github link */}
          <div className="flex justify-center py-6">
            <a
              href="https://github.com/osallak"
              target="_blank"
              rel="noopener noreferrer"
              className="block h-6 w-6 text-white/60 transition-colors hover:text-white"
            >
              <IconGithub />
            </a>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 z-40 w-full border-t border-white/10 bg-black/95 sm:hidden">
        <div className="mx-auto grid h-16 max-w-lg grid-cols-5">
          <NavLink href="/profile" icon={IconUser} label="Profile" />
          <NavLink href="/top-artists" icon={IconMicrophone} label="Artists" />
          <NavLink href="/top-tracks" icon={IconMusic} label="Tracks" />
          <NavLink href="/recent" icon={IconTime} label="Recent" />
          <NavLink href="/playlists" icon={IconPlaylist} label="Playlists" />
        </div>
      </nav>
    </>
  );
}
