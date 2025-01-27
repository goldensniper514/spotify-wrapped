"use client";

import { useEffect, useState, use } from "react";
import { getArtist } from "@/utils/spotifyApi";
import { formatWithCommas } from "@/utils/formatters";
import { Artist as ArtistType } from "@/types";
import { Container } from "@/components/Container";
import { Loader } from "@/components/Loader";
import Image from "next/image";

const ArtistContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4 mt-[100px]">
      {children}
    </div>
  );
};

const Artwork = ({ imageUrl }: { imageUrl: string }) => {
  return (
    <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[300px] lg:h-[300px] shadow-[0_0_10px_rgba(0,0,0,0.3)]">
      <Image
        src={imageUrl}
        alt="Artist Artwork"
        fill
        className="object-cover rounded-full"
      />
    </div>
  );
};

const ArtistName = ({ name }: { name: string }) => {
  return (
    <h1 className="text-[32px] md:text-[70px] mt-[30px] font-black text-white">
      {name}
    </h1>
  );
};

const Stats = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-3 gap-[20px] mt-[30px] text-center w-full max-w-[600px]">
      {children}
    </div>
  );
};

const Stat = ({
  number,
  label,
}: {
  number: string | number | React.ReactNode;
  label: string;
}) => {
  return (
    <div>
      <div className="text-[20px] md:text-[24px] text-[#509bf5] font-bold capitalize">
        {number}
      </div>
      <p className="text-[12px] text-[#9B9B9B] uppercase tracking-[1px] mt-[5px]">
        {label}
      </p>
    </div>
  );
};

const Genre = ({ genre }: { genre: string }) => {
  return <div className="text-[20px] md:text-[20px] capitalize">{genre}</div>;
};

export default function Artist({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [artist, setArtist] = useState<ArtistType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getArtist(resolvedParams.id);
        setArtist(data);
      } catch (error) {
        console.error("Error fetching artist:", error);
      }
    };

    fetchData();
  }, [resolvedParams.id]);

  if (!artist) {
    return <Loader />;
  }

  return (
    <Container className="h-screen">
      <ArtistContainer>
        <Artwork imageUrl={artist.images[0].url} />
        <div>
          <ArtistName name={artist.name} />
          <Stats>
            <Stat
              number={formatWithCommas(artist.followers.total)}
              label="Followers"
            />
            {artist.genres && (
              <Stat
                number={
                  <div className="flex flex-col gap-1">
                    {artist.genres.slice(0, 2).map((genre) => (
                      <Genre key={genre} genre={genre} />
                    ))}
                  </div>
                }
                label="Genres"
              />
            )}
            {artist.popularity && (
              <Stat number={`${artist.popularity}%`} label="Popularity" />
            )}
          </Stats>
        </div>
      </ArtistContainer>
    </Container>
  );
}
