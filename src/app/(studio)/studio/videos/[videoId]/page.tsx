import { VideoView } from "@/modules/studio/ui/views/video-view";
import { HydrateClient, trpc } from "@/trpc/server";

interface VideoDetailPageProps {
  params: Promise<{ videoId: string }>;
};

export const dynamic = "force-dynamic";

const VideoDetailPage = async ({ params }: VideoDetailPageProps) => {
  const { videoId } = await params;
  void trpc.studio.getOne.prefetch({ id: videoId });
  void trpc.categories.getMany.prefetch();

  return (
    <HydrateClient>
      <VideoView videoId={videoId} />
    </HydrateClient>
  );
};

export default VideoDetailPage;