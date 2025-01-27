"use client";

import { useEffect, useState } from "react";
import { getTopTracks } from "@/utils/spotifyApi";
import { Track, Artist } from "@/types";
import { Loader } from "@/components/Loader";
import Image from "next/image";
import Link from "next/link";

type TimeRange = "short_term" | "medium_term" | "long_term";

interface TopTracksProps {
  tracks: Track[];
}

const formatDuration = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function TopTracks({ tracks }: TopTracksProps) {
  return (
    <div>
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-[18px] font-bold mr-6">Top Tracks of All Time</h3>
        <Link href="/top-tracks" className="btn-general whitespace-nowrap">
          SEE MORE
        </Link>
      </div>

      <div>
        <ul className="space-y-2">
          {tracks.map((track, i) => (
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
                    fill
                    className="rounded object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-grow min-w-0 flex justify-between items-center">
                  <div className="min-w-0 flex-grow">
                    <div className="text-sm font-medium truncate">
                      {track.name}
                    </div>
                    <div className="text-sm text-zinc-400 truncate">
                      {track.artists.map((a) => a.name).join(", ")} •{" "}
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
  );
}
