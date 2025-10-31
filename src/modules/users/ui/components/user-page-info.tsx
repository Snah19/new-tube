import { UserAvatar } from "@/components/user-avatar";
import { UserGetOneOutput } from "../../types";
import { useAuth, useClerk } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SubscriptionButton } from "@/modules/subscriptions/ui/components/subscription-button";
import { useSubscription } from "@/modules/subscriptions/hooks/use-subscription";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface UserPageInfoProps {
  user: UserGetOneOutput;
};

export const UserPageInfoSkeleton = () => {
  return (
    <div className="py-6">
      {/* Mobile layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <Skeleton className="w-[60px] h-[60px] rounded-full" />
          <div className="flex-1 min-w-0">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-48 h-4 mt-1" />
            <Skeleton />
          </div>
        </div>
        <Skeleton className="h-10 w-full mt-3 rounded-full" />
      </div>
      {/* Desktop layout */}
      <div className="hidden md:flex items-start gap-4">
        <Skeleton className="w-[160px] h-[160px] rounded-full" />
        <div className="flex-1 min-w-0">
          <Skeleton className="w-64 h-8" />
          <Skeleton className="w-48 h-5 mt-4" />
          <Skeleton className="w-32 h-10 mt-3 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export const UserPageInfo = ({ user }: UserPageInfoProps) => {
  const { userId, isLoaded } = useAuth();
  const clerk = useClerk();

  const { isPending, onClick } = useSubscription({
    userId: user.id,
    isSubscribed: user.viewerSubscribed,
  });

  return (
    <div className="py-6">
      {/* Mobile layout */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center gap-3">
          <UserAvatar className="w-[60px] h-[60px]" size="lg" imageUrl={user.imageUrl} name={user.name} onClick={() => user.clerkId === userId && clerk.openUserProfile()} />
          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold">{user.name}</h1>
            <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
              <span>{user.subscriberCount} subscribers</span>
              <span>&bull;</span>
              <span>{user.videoCount} videos</span>
            </div>
          </div>
        </div>
        {userId === user.clerkId ? (
          <Button className="w-full mt-3 rounded-full" variant="secondary" asChild>
            <Link href="/studio">Go to studio</Link>
          </Button>
        ) : (
          <SubscriptionButton className="w-full mt-3" disabled={isPending || !isLoaded} isSubscribed={user.viewerSubscribed} onClick={onClick} />
        )}
      </div>
      {/* Desktop layout */}
      <div className="hidden md:flex items-start gap-4">
        <UserAvatar className={cn(userId === user.clerkId && "cursor-pointer hover:opacity-80 transition-opacity duration-300")} size="xl" imageUrl={user.imageUrl} name={user.name} onClick={() => user.clerkId === userId && clerk.openUserProfile()} />
        <div className="flex-1 min-w-0">
          <h1 className="text-4xl font-bold">{user.name}</h1>
          <div className="flex items-center gap-1 mt-3 text-sm text-muted-foreground">
            <span>{user.subscriberCount} subscribers</span>
            <span>&bull;</span>
            <span>{user.videoCount} videos</span>
          </div>
          {userId === user.clerkId ? (
            <Button className="mt-3 rounded-full" variant="secondary" asChild>
              <Link href="/studio">Go to studio</Link>
            </Button>
          ) : (
            <SubscriptionButton className="mt-3" disabled={isPending || !isLoaded} isSubscribed={user.viewerSubscribed} onClick={onClick} />
          )}
        </div>
      </div>
    </div>
  );
};