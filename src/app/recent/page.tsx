"use client";

import { useEffect, useState } from "react";
import { getUserProfile } from "@/utils/spotifyApi";
import { Track } from "@/types";
import { Container } from "@/components/Container";
import Image from "next/image";

interface RecentlyPlayedItem {
  track: Track;
  played_at: string;
}

export default function Recent() {
  const [recentTracks, setRecentTracks] = useState<RecentlyPlayedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        setRecentTracks(data.recentlyPlayed.items);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date: string) => {
    const now = new Date();
    const playedAt = new Date(date);
    const diffInHours = Math.floor(
      (now.getTime() - playedAt.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 24) {
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(
          (now.getTime() - playedAt.getTime()) / (1000 * 60)
        );
        return `${diffInMinutes} ${
          diffInMinutes === 1 ? "minute" : "minutes"
        } ago`;
      }
      return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`;
    }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return playedAt.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        playedAt.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const formatDuration = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <Container className="bg-spotify-black">
      <div className="sticky top-0 z-10 bg-spotify-black/95 backdrop-blur-sm">
        <div className="pb-6">
          <h2 className="text-lg font-bold text-white text-center sm:text-left">
            Recently Played Tracks
          </h2>
        </div>
      </div>

      <div className="grid gap-1 pt-6">
        {loading
          ? [...Array(20)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded bg-white/10" />
            ))
          : recentTracks.map((item, i) => (
              <a
                key={`${item.track.id}-${i}`}
                href={item.track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[auto,1fr,auto] items-center gap-4 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <div className="relative w-[50px] min-w-[50px]">
                  <Image
                    src={item.track.album.images[2]?.url || ""}
                    alt={item.track.album.name}
                    width={50}
                    height={50}
                    className="object-cover rounded"
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
                <div className="min-w-0 flex-grow">
                  <div className="text-sm font-medium truncate">
                    {item.track.name}
                  </div>
                  <div className="text-sm text-zinc-400 truncate">
                    {item.track.artists.map((a) => a.name).join(", ")} •{" "}
                    {item.track.album.name}
                  </div>
                </div>
                <div className="text-sm text-zinc-400 flex flex-col items-end">
                  <div>{formatDuration(item.track.duration_ms)}</div>
                  <div className="text-xs">{formatDate(item.played_at)}</div>
                </div>
              </a>
            ))}
      </div>
    </Container>
  );
}
