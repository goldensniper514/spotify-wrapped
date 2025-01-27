"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { getPlaylists } from "@/utils/spotifyApi";
import { Container } from "@/components/Container";

interface Playlist {
  id: string;
  name: string;
  images: { url: string }[];
  external_urls: { spotify: string };
  tracks: {
    total: number;
  };
  owner: {
    display_name: string;
  };
}

export default function Playlists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        setLoading(true);
        const response = await getPlaylists();
        setPlaylists(response.data.items);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    };

    if (mounted) {
      fetchPlaylists();
    }
  }, [mounted]);

  if (!mounted) return null;

  return (
    <Container>
      <div className="mb-12">
        <h2 className="text-lg sm:text-lg font-bold text-white text-center sm:text-left">
          Your Playlists
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {loading
          ? [...Array(20)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="mx-auto aspect-square w-full animate-pulse rounded bg-white/10" />
                <div className="h-5 w-2/3 mx-auto animate-pulse rounded bg-white/10" />
                <div className="h-4 w-1/2 mx-auto animate-pulse rounded bg-white/10" />
              </div>
            ))
          : playlists.map((playlist) => (
              <a
                key={playlist.id}
                href={playlist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col text-center sm:text-left"
              >
                <div className="relative w-full">
                  <div className="aspect-square overflow-hidden rounded">
                    <Image
                      src={playlist.images[0]?.url}
                      alt={playlist.name}
                      width={200}
                      height={200}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center rounded bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
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
                <div className="mt-4 space-y-1">
                  <p className="font-medium">
                    <span className="border-b border-transparent text-white/90 transition-colors hover:border-white hover:text-white">
                      {playlist.name}
                    </span>
                  </p>
                  <p className="text-sm text-white/60">
                    {playlist.tracks.total} tracks
                  </p>
                </div>
              </a>
            ))}
      </div>
    </Container>
  );
}
