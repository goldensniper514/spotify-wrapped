'use client';

import { useState, useEffect } from 'react';
import { getAccessToken } from '@/utils/spotify';

export default function Home() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    setAccessToken(token);
    setIsLoading(false);
  }, []);

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

  const handleLogout = () => {
    // Remove all Spotify-related items from localStorage
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    localStorage.removeItem('spotify_token_timestamp');

    // Update state to reflect logged out status
    setAccessToken(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      {accessToken ? (
        <div className="flex flex-col items-center gap-4">
          <div>Logged in!</div>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleLogin}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Login with Spotify
        </button>
      )}
    </main>
  );
}
