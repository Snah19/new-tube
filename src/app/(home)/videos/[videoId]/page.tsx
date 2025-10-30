import { DEFAULT_LIMIT } from "@/constants";
import { VideoView } from "@/modules/videos/ui/views/video-view";
import { HydrateClient, trpc } from "@/trpc/server";

export const dynamic = "force-dynamic";

interface VideoDetailPageProps {
  params: Promise<{ videoId: string; }>
};

const VideoDetailPage = async ({ params }: VideoDetailPageProps) => {
  const { videoId } = await params;
  void trpc.videos.getOne.prefetch({ id: videoId });
  // TODO: don't forget to change to 'prefetchInfinite'
  void trpc.comments.getMany.prefetchInfinite({ videoId, limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
};

export default VideoDetailPage;