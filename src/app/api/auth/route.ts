import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { code } = await request.json();

        const clientId = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
        const clientSecret = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET;
        const redirectUri = process.env.NEXT_PUBLIC_REDIRECT_URI;

        // Verify all required parameters
        if (!clientId || !clientSecret || !redirectUri || !code) {
            console.error('Missing required parameters:', { clientId: !!clientId, clientSecret: !!clientSecret, redirectUri: !!redirectUri, code: !!code });
            return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
        }

        // Create authorization header
        const authHeader = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        // Log the request details (remove in production)
        console.log('Auth Request Details:', {
            code,
            redirectUri,
            authHeaderLength: authHeader.length
        });

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${authHeader}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                code,
                redirect_uri: redirectUri,
            }).toString(),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Spotify API Error:', errorData);
            return NextResponse.json(errorData, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Auth route error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
} 