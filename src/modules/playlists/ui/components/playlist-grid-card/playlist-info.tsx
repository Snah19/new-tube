import { Skeleton } from "@/components/ui/skeleton";
import { PlaylistGetManyOutput } from "@/modules/playlists/type";

interface PlaylistInfoProps {
  data: PlaylistGetManyOutput["items"][number];
}

export const PlaylistInfoSkeleton = () => {
  return (
    <div className="flex gap-3">
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="w-[90%] h-5" />
        <Skeleton className="w-[70%] h-5" />
        <Skeleton className="w-[50%] h-5" />
      </div>
    </div>
  );
};

export const PlaylistInfo = ({ data } : PlaylistInfoProps) => {
  return (
    <div className="flex gap-3">
      <div className="min-w-0">
        <h3 className="text-sm font-medium line-clamp-1 lg:line-clamp-2 break-words">{data.name}</h3>
        <p className="text-sm text-muted-foreground">Playlist</p>
        <p className="text-sm font-semibold text-muted-foreground hover:text-primary">View full playlist</p>
      </div>
    </div>
  );
};