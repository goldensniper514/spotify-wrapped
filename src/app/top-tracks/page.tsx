"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getTopTracks } from "@/utils/spotifyApi";
import { Track } from "@/types";
import { Container } from "@/components/Container";

type TimeRange = "long_term" | "medium_term" | "short_term";

export default function TopTracks() {
  const [timeRange, setTimeRange] = useState<TimeRange>("long_term");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  const timeRangeLabels = {
    long_term: "All Time",
    medium_term: "Last 6 Months",
    short_term: "Last 4 Weeks",
  };

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        setLoading(true);
        const response = await getTopTracks(timeRange);
        setTracks(response.data.items);
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTracks();
  }, [timeRange]);

  return (
    <Container as="main" className="bg-spotify-black">
      <div className="sticky top-0 z-10 bg-spotify-black/95 backdrop-blur-sm">
        <div className="pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-0">
          <h2 className="text-lg sm:text-lg font-bold text-white text-center sm:text-left">
            Top Tracks
          </h2>
          <div className="flex justify-center sm:justify-end">
            {Object.entries(timeRangeLabels).map(([range, label]) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as TimeRange)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-semibold transition-colors hover:text-white ${
                  timeRange === range ? "text-white" : "text-white/60"
                }`}
              >
                <span
                  className={`relative pb-0.5 ${
                    timeRange === range
                      ? "after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:bg-white"
                      : ""
                  }`}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-1 pt-6">
        {loading
          ? [...Array(50)].map((_, i) => (
              <div key={i} className="h-16 animate-pulse rounded bg-white/10" />
            ))
          : tracks.map((track) => (
              <a
                key={track.id}
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="grid grid-cols-[auto,1fr] items-center gap-4 py-2 px-3 rounded-lg hover:bg-white/5 transition-colors group"
              >
                <div className="relative w-[50px] min-w-[50px]">
                  <Image
                    src={track.album.images[2]?.url || ""}
                    alt={track.album.name}
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
                <div className="grid grid-cols-[1fr,max-content] gap-[10px] min-w-0">
                  <div className="overflow-hidden">
                    <p className="font-medium text-white/90 truncate group-hover:text-white transition-colors">
                      {track.name}
                    </p>
                    <p className="text-sm text-white/60 truncate mt-[3px]">
                      {track.artists.map((artist) => artist.name).join(", ")} •{" "}
                      {track.album.name}
                    </p>
                  </div>
                  <div className="text-sm text-white/60">
                    {formatDuration(track.duration_ms)}
                  </div>
                </div>
              </a>
            ))}
      </div>
    </Container>
  );
}

function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
