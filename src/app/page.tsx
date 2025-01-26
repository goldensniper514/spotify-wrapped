'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/utils/spotify';
import User from '@/components/User';

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      setMounted(true);
      const token = await getAccessToken();
      setAccessToken(token);
    };

    fetchToken();
  }, []);

  // Don't render anything until after client-side hydration
  if (!mounted) {
    return null;
  }

  const handleLogin = () => {
    const client_id = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
    const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI;

    if (!client_id || !redirect_uri) {
      console.error('Missing required environment variables');
      return;
    }

    const authUrl = new URL('https://accounts.spotify.com/authorize');

    const params = {
      client_id,
      response_type: 'code',
      redirect_uri,
      scope: [
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-follow-read',
        'playlist-read-private',
        'user-read-recently-played',
      ].join(' '),
    };

    Object.entries(params).forEach(([key, value]) => {
      authUrl.searchParams.append(key, value);
    });

    window.location.href = authUrl.toString();
  };

  return (
    <main className="min-h-screen">
      {accessToken ? (
        <User />
      ) : (
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h1 className='m-[0,0,10px] font-black text-2xl'>Spotify Profile</h1>
          <button onClick={handleLogin} className="inline-block bg-spotify-green text-white rounded-[30px]  tracking-[2px] text-center font-bold mt-2">
            Login to Spotify
          </button>
        </div>
      )}
    </main>
  );
}
