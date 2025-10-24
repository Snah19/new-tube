import { categoriesRouter } from '@/modules/categories/server/procedure';
import { createTRPCRouter } from '../init';
import { studioRouter } from '@/modules/studio/server/procedures';
import { videoRouter } from '@/modules/videos/server/procedures';
import { videoViewsRouter } from '@/modules/video-views/server/procedure';
import { videoReactionsRouter } from '@/modules/video-reactions/server/procedures';
import { subscriptionRouter } from '@/modules/subscriptions/server/procedures';

export const appRouter = createTRPCRouter({
  studio: studioRouter,
  categories: categoriesRouter,
  videos: videoRouter,
  videoViews: videoViewsRouter,
  videoReactions: videoReactionsRouter,
  subscriptions: subscriptionRouter,
});
// export type definition of API
export type AppRouter = typeof appRouter;