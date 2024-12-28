interface Image {
    url: string;
}

export interface UserProfile {
    display_name: string;
    images: Image[];
    followers: { total: number };
    external_urls: { spotify: string };
}

export interface Artist {
    name: string;
    images: Image[];
    external_urls: { spotify: string };
}

export interface Track {
    name: string;
    artists: { name: string }[];
    album: {
        name: string;
        images: Image[];
    };
    external_urls: { spotify: string };
    duration_ms: number;
}