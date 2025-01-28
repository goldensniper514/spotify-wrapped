"use client";

import { useState, useEffect } from "react";
import { getAccessToken } from "@/utils/spotify";
import User from "@/components/User";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      setMounted(true);
      const token = await getAccessToken();
      setAccessToken(token);
      if (token) {
        router.push("/profile");
      }
    };

    fetchToken();
  }, [router]);

  // Don't render anything until after client-side hydration
  if (!mounted) {
    return null;
  }

  const handleLogin = () => {
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    if (!client_id || !redirect_uri) {
      console.error("Missing required environment variables");
      return;
    }

    const authUrl = new URL("https://accounts.spotify.com/authorize");

    const params = {
      client_id,
      response_type: "code",
      redirect_uri,
      scope: [
        "user-read-private",
        "user-read-email",
        "user-top-read",
        "user-follow-read",
        "playlist-read-private",
        "user-read-recently-played",
      ].join(" "),
    };

    Object.entries(params).forEach(([key, value]) => {
      authUrl.searchParams.append(key, value);
    });

    window.location.href = authUrl.toString();
  };

  return (
    <Container className="bg-spotify-black min-h-screen">
      {accessToken ? (
        <User />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
          <h1 className="m-[0,0,10px] font-black text-2xl">Spotify Profile</h1>
          <button
            onClick={handleLogin}
            className="inline-block bg-spotify-green text-white rounded-[30px] tracking-[2px] text-center font-bold mt-2 px-8 py-3"
          >
            Login to Spotify
          </button>
        </div>
      )}
    </Container>
  );
}
