import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getProfitableMarkets } from "@/server/utils/risk";

export const marketRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const markets = await getProfitableMarkets();
    return markets;
  }),
});
