"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { PlaylistCreateModal } from "../components/playlist-create-modal";
import { useState } from "react";
import { PlaylistsSection } from "../section/playlists-section";

export const PlaylistsView = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);

  return (
    <div className="flex flex-col gap-y-6 max-w-[2400px] mx-auto mb-10 pt-2.5 px-4">
      <PlaylistCreateModal open={createModalOpen} onOpenChange={setCreateModalOpen} />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Playlists</h1>
          <p className="text-xs text-muted-foreground">Playlists you have created</p>
        </div>
        <Button className="rounded-full" variant="outline" size="icon" onClick={() => setCreateModalOpen(true)}>
          <PlusIcon  />
        </Button>
      </div>
      <PlaylistsSection />
    </div>
  );
};