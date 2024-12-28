import Image from 'next/image';
import { Artist } from '@/types/spotify';

interface TopArtistsProps {
  artists: Artist[];
}

export function TopArtists({ artists }: TopArtistsProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Top Artists of All Time</h3>
        <button className="mt-[10px] px-[30px] py-3 border border-white rounded-[30px] text-xs font-bold tracking-[1px] uppercase text-center 
          hover:bg-white hover:text-black transition-all duration-250">
          SEE MORE
        </button>
      </div>

      <div>
        <ul className="space-y-2">
          {artists.map((artist, i) => (
            <li key={i}>
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 rounded-md hover:bg-[#282828] transition-colors group h-[64px]"
              >
                <div className="relative w-[48px] h-[48px] flex-shrink-0">
                  <Image
                    src={artist.images[0].url}
                    alt={artist.name}
                    width={48}
                    height={48}
                    className="rounded object-cover"
                  />
                </div>
                <div className="flex-grow min-w-0">
                  <div className="text-sm font-medium truncate">
                    {artist.name}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
