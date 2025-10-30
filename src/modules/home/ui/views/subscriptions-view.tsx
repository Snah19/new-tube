import { SubscriptionVideosSection } from "../sections/subscriptions-videos-section";

export const SubscriptionsView = () => {
  return (
    <div className="flex flex-col gap-y-6 max-w-[2400px] mx-auto mb-10 pt-2.5 px-4">
      <div>
        <h1 className="text-2xl font-bold">Subscriptions</h1>
        <p className="text-xs text-muted-foreground">Videos from your favorite creators</p>
      </div>
      <SubscriptionVideosSection />
    </div>
  );
};