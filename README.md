# Spotify Profile Viewer

A web application that allows users to view their Spotify profile and listening data using the Spotify Web API.

## Demo

[![Spotify Profile Viewer Demo](https://img.youtube.com/vi/d9XKMcLltvw/0.jpg)](https://youtu.be/d9XKMcLltvw)

## Prerequisites

Before you begin, ensure you have:

- Node.js (v18 or higher)
- A Spotify Developer account
- A registered Spotify application with:
  - Client ID
  - Client Secret
  - Redirect URI set to `http://localhost:3000/callback`

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/osallak/spotify-wrapped
   cd spotif-wrapped
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your Spotify credentials:

   ```bash
   NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id_here
   NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_client_secret_here
   NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/callback
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features

- Spotify Authentication
- User Profile Display
- Top Artists and Tracks
- Recently Played Tracks
- Playlists
- Following Data

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Spotify Web API](https://developer.spotify.com/documentation/web-api) - Data source

## Development

To contribute to this project:

1. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:

   ```bash
   git commit -m "Add your feature description"
   ```

3. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_SPOTIFY_CLIENT_ID`: Your Spotify application client ID
- `NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET`: Your Spotify application client secret
- `NEXT_PUBLIC_REDIRECT_URI`: The callback URL for Spotify authentication

## Spotify Setup

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create a new application
3. Add `http://localhost:3000/callback` to the Redirect URIs in your application settings
4. Copy the Client ID and Client Secret to your `.env.local` file

## License

[Your chosen license]

## Acknowledgments

- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api)
- [Next.js Documentation](https://nextjs.org/docs)
