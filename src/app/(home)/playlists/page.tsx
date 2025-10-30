import { DEFAULT_LIMIT } from "@/constants";
import { PlaylistsView } from "@/modules/playlists/ui/views/playlists-view";
import { trpc, HydrateClient } from "@/trpc/server";

export const dynamic = "force-dynamic";

const PlaylistsPage = () => {
  void trpc.playlists.getMany.prefetchInfinite({ limit: DEFAULT_LIMIT });

  return (
    <HydrateClient>
      <PlaylistsView />
    </HydrateClient>
  );
};

export default PlaylistsPage;