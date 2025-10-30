import { PlaylistHeaderSection } from "../section/playlist-header-section";
import { VideosSection } from "../section/videos-section";

interface VideosViewProps {
  playlistId: string;
};

export const VideosView = ({ playlistId }: VideosViewProps) => {
  return (
    <div className="flex flex-col gap-y-6 max-w-screen-md mx-auto mb-10 pt-2.5 px-4">
      <PlaylistHeaderSection playlistId={playlistId} />
      <VideosSection playlistId={playlistId} />
    </div>
  );
};