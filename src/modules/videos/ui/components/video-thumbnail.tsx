import { formatDuration } from "@/lib/utils";
import Image from "next/image";
import { THUMBNAIL_FALLBACK } from "../../constant";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoThumbnailProps {
  title: string;
  duration: number;
  imageUrl?: string | null;
  previewUrl?: string | null;
};

export const VideoThumbnailSkeleton = () => {
  return (
    <div className="relative w-full aspect-video overflow-hidden rounded-xl">
      <Skeleton className="size-full" />
    </div>
  );
};

export const VideoThumbnail = ({ title, duration, imageUrl, previewUrl }: VideoThumbnailProps) => {
  return (
    <div className="relative group">
      {/* Thumbnail wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image className="size-full object-cover group-hover:opacity-0" src={imageUrl ?? THUMBNAIL_FALLBACK} alt={title} fill />
        <Image className="size-full object-cover opacity-0 group-hover:opacity-100" src={previewUrl ?? THUMBNAIL_FALLBACK} alt={title} fill unoptimized={!!previewUrl} />
      </div>
      {/* Video Duration box */}
      {/* TODO: Add video duration box */}
      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
        {formatDuration(duration)}
      </div>
    </div>
  );
};