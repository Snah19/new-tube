import { HistoryVideosSection } from "../section/history-videos-section";


export const HistoryView = () => {
  return (
    <div className="flex flex-col gap-y-6 max-w-screen-md mx-auto mb-10 pt-2.5 px-4">
      <div>
        <h1 className="text-2xl font-bold">History</h1>
        <p className="text-xs text-muted-foreground">Video you have watched</p>
      </div>
      <HistoryVideosSection />
    </div>
  );
};