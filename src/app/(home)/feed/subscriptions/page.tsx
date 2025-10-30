import { DEFAULT_LIMIT } from "@/constants";
import { SubscriptionsView } from "@/modules/home/ui/views/subscriptions-view";
import { HydrateClient, trpc } from "@/trpc/server";


const SubscriptionPage = async () => {
  void trpc.videos.getManySubscriptions.prefetchInfinite({ limit: DEFAULT_LIMIT });
  return (
    <HydrateClient>
      <SubscriptionsView />
    </HydrateClient>
  );
};

export default SubscriptionPage;