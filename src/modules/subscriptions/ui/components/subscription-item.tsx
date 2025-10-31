import { UserAvatar } from "@/components/user-avatar";
import { SubscriptionButton } from "./subscription-button";
import { Skeleton } from "@/components/ui/skeleton";

interface SubscriptionItemProps {
  name: string;
  imageUrl: string;
  subscriberCount: number;
  onUnsubscribe: () => void;
  disabled: boolean;
};

export const SubscriptionItemSkeleton = () => {
  return (
    <div className="flex items-start gap-4">
      <Skeleton className="size-10 rounded-full" />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <Skeleton className="w-24 h-4" />
            <Skeleton className="w-20 h-3 mt-1" />
          </div>

          <Skeleton className="w-24 h-8 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const SubscriptionItem = ({name, imageUrl, subscriberCount, onUnsubscribe, disabled}: SubscriptionItemProps) => {
  return (
    <div className="flex items-start gap-4">
      <UserAvatar size="lg" imageUrl={imageUrl} name={name} />
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm">{name}</h3>
            <p className="text-xs text-muted-foreground">{subscriberCount} {subscriberCount === 1 ? "subscriber" : "subscribers"}</p>
          </div>
          <SubscriptionButton size="sm" onClick={e => { e.preventDefault(); onUnsubscribe(); }} disabled={disabled} isSubscribed />
        </div>
      </div>
    </div>
  );
};