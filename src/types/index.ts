export interface SpotifyImage {
    url: string;
    height: number;
    width: number;
}

export interface Artist {
    id: string;
    name: string;
    external_urls: {
        spotify: string;
    };
}

export interface Album {
    id: string;
    name: string;
    images: SpotifyImage[];
}

export interface Track {
    id: string;
    name: string;
    duration_ms: number;
    external_urls: {
        spotify: string;
    };
    album: Album;
    artists: Artist[];
}

export interface TopTracksResponse {
    items: Track[];
}
