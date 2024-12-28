interface ProfileStatsProps {
  followers: number;
  following: number | null;
  playlistsCount: number | null;
}

export function ProfileStats({ followers, following, playlistsCount }: ProfileStatsProps) {
  return (
    <div className="flex gap-4 mt-4">
      <div><span className="font-bold">{followers}</span> followers</div>
      <div><span className="font-bold">{following}</span> following</div>
      <div><span className="font-bold">{playlistsCount}</span> playlists</div>
    </div>
  );
} 