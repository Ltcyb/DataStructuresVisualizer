import { createTRPCRouter } from "~/server/api/trpc";
import { nodeRouter } from "./routers/nodeRouter";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  node: nodeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
