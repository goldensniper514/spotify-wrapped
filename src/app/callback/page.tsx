'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Callback() {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      console.error('Auth error:', error);
      router.push('/');
      return;
    }

    if (code) {
      exchangeToken(code);
    } else {
      router.push('/');
    }
  }, [router]);

  const exchangeToken = async (code: string) => {
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Failed to exchange token');
      }

      const data = await response.json();

      localStorage.setItem('spotify_access_token', data.access_token);
      localStorage.setItem('spotify_refresh_token', data.refresh_token);
      localStorage.setItem('spotify_token_timestamp', Date.now().toString());

      router.push('/');
    } catch (error) {
      console.error('Error exchanging token:', error);
      router.push('/');
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-zinc-900">
      <div className="text-white">Connecting to Spotify...</div>
    </div>
  );
}
