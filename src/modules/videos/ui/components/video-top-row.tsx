import { useMemo } from "react";
import { VideoGetOneOutput } from "../../types";
import { VideoDescription } from "./video-description";
import { VideoMenu } from "./video-menu";
import { VideoOwner } from "./video-owner";
import { VideoReactions } from "./video-reactions";
import { format, formatDistanceToNow } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoTopRowProps {
  video: VideoGetOneOutput,
};

export const VideoTopRowSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="w-4/5 md:w-2/5 h-6" />
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3 w-[70%]">
          <Skeleton className="shrink-0 w-10 h-10 rounded-full" />
          <div className="flex flex-col gap-2 w-full">
            <Skeleton className="w-4/5 md:w-2/6 h-5" />
            <Skeleton className="w-3/5 md:w-1/5 h-5" />
          </div>
        </div>
        <Skeleton className="w-2/6 md:w-1/6 h-9 rounded-full" />
      </div>
      <div className="w-full h-[120px]" />
    </div>
  );
}

export const VideoTopRow = ({ video }: VideoTopRowProps) => {
  const compactViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "compact"
    }).format(video.viewCount);

  }, [video.viewCount]);

  const expandedViews = useMemo(() => {
    return Intl.NumberFormat("en", {
      notation: "standard"
    }).format(video.viewCount);

  }, [video.viewCount]);

  const compactDate = useMemo(() => {
    return formatDistanceToNow(video.createdAt, { addSuffix: true });
  }, []);

  const expandedDate = useMemo(() => {
    return format(video.createdAt, "d MMM yyyy");
  }, []);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <h1 className="text-xl font-semibold">{video.title}</h1>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <VideoOwner user={video.user} videoId={video.id} />
        <div className="flex overflow-x-auto sm:min-w-[calc(50%-6px)] sm:justify-end gap-2 pb-2 -mb-2 sm:pb-0 sm:mb-0  sm:overflow-visible ">
          <VideoReactions videoId={video.id} likes={video.likeCount} dislikes={video.dislikeCount} viewerReaction={video.viewerReaction} />
          <VideoMenu videoId={video.id} variant="secondary" onRemove={() => { }} />
        </div>
      </div>
      <VideoDescription description={video.description} compactViews={compactViews} expandedViews={expandedViews} compactDate={compactDate} expandedDate={expandedDate} />
    </div>
  );
};