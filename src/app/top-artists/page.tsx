"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTopArtists } from "@/utils/spotifyApi";
import { Container } from "@/components/Container";
import { Artist } from "@/types";

type TimeRange = "long_term" | "medium_term" | "short_term";

export default function TopArtists() {
  const [timeRange, setTimeRange] = useState<TimeRange>("long_term");
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);

  const timeRangeLabels = {
    long_term: "All Time",
    medium_term: "Last 6 Months",
    short_term: "Last 4 Weeks",
  };

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        setLoading(true);
        const response = await getTopArtists(timeRange);
        setArtists(response.data.items);
      } catch (error) {
        console.error("Error fetching top artists:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopArtists();
  }, [timeRange]);

  return (
    <Container className="bg-spotify-black">
      <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-0">
        <h2 className="text-lg sm:text-lg font-bold text-white text-center sm:text-left">
          Top Artists
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {loading
          ? [...Array(50)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="mx-auto aspect-square w-full max-w-[200px] animate-pulse rounded-full bg-white/10" />
                <div className="mx-auto h-5 w-2/3 animate-pulse rounded bg-white/10" />
              </div>
            ))
          : artists.map((artist) => (
              <Link
                key={artist.id}
                href={`/artist/${artist.id}`}
                className="group flex flex-col items-center text-center"
              >
                <div className="relative w-full max-w-[200px]">
                  <div className="aspect-square overflow-hidden rounded-full">
                    <Image
                      src={artist.images[0]?.url}
                      alt={artist.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white"
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
                <p className="mt-4 text-base font-medium">
                  <span className="border-b border-transparent text-white/90 transition-colors hover:border-white hover:text-white">
                    {artist.name}
                  </span>
                </p>
              </Link>
            ))}
      </div>
    </Container>
  );
}
