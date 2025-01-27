import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const refresh_token = searchParams.get('refresh_token');

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${Buffer.from(
                `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
            ).toString('base64')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refresh_token!,
        }),
    });

    const data = await response.json();
    return NextResponse.json(data);
}
