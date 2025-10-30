import { LikedVideosSection } from "../section/liked-videos-section";

export const LikedView = () => {
  return (
    <div className="flex flex-col gap-y-6 max-w-screen-md mx-auto mb-10 pt-2.5 px-4">
      <div>
        <h1 className="text-2xl font-bold">Liked</h1>
        <p className="text-xs text-muted-foreground">Videos you have liked</p>
      </div>
      <LikedVideosSection />
    </div>
  );
};