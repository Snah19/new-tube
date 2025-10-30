import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { THUMBNAIL_FALLBACK } from "@/modules/videos/constant";
import { ListVideoIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

interface PlaylistThumbnailProps {
  title: string;
  videoCount: number;
  className?: string;
  imageUrl?: string | null;
};

export const PlaylistThumbnailSkeleton = () => {
  return (
    <div className="relative w-full overflow-hidden rounded-xl aspect-video">
      <Skeleton className="size-full" />
    </div>
  );
};

export const PlaylistThumbnail = ({ title, videoCount, className, imageUrl }: PlaylistThumbnailProps) => {
  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact"
    }).format(videoCount);

  }, [videoCount]);

  return (
    <div className={cn("relative pt-3", className)}>
      {/* Stack effect layers */}
      <div className="relative">
        {/* Background layers */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[97%] overflow-hidden rounded-xl bg-black/20 aspect-video" />
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-[98.5%] overflow-hidden rounded-xl bg-black/25 aspect-video" />
        {/* Main image */}
        <div className="relative overflow-hidden w-full rounded-xl aspect-video">
          <Image className="w-full h-full" src={imageUrl || THUMBNAIL_FALLBACK} alt={title} fill />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex justify-center items-center bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-x-2">
              <PlayIcon className="size-4 text-white fill-white" />
              <span className="font-medium text-white">Play all</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video count indicator */}
      <div className="absolute bottom-2 right-2 flex items-center gap-x-1 py-0.5 px-1 text-xs font-medium rounded bg-black/80 text-white">
        <ListVideoIcon className="size-4" />
        {compactViews} videos
      </div>
    </div>
  );
};