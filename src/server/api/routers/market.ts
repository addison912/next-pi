import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const marketRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return {
      greeting: `Hello`,
    };
  }),
});
