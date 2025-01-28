interface Image {
    url: string;
    height: number;
    width: number;
}

export interface UserProfile {
    display_name: string;
    images: Image[];
    followers: { total: number };
    external_urls: { spotify: string };
}

export interface Artist {
    id: string;
    name: string;
    images: Image[];
    followers: { total: number };
    genres: string[];
    popularity: number;
    external_urls: { spotify: string };
}

export interface Track {
    id: string;
    name: string;
    artists: Artist[];
    album: {
        id: string;
        name: string;
        images: Image[];
    };
    external_urls: { spotify: string };
    duration_ms: number;
}
