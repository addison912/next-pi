import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  getContractData,
  getMarketDetails,
  getProfitableMarkets,
} from "@/utils/predictit/api";
import { calcOptOrder } from "@/utils/predictit/risk";
import { z } from "zod";

export const marketRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const markets = await getProfitableMarkets();
    return markets;
  }),
  getMarketByID: publicProcedure
    .input(
      z.object({
        marketID: z.string().min(4),
      }),
    )
    .query(async ({ input }) => {
      return getMarketDetails(input.marketID.toString());
    }),
  getOptOrder: publicProcedure
    .input(
      z.object({
        marketID: z.string().min(4),
      }),
    )
    .query(async ({ input }) => {
      const contractData = await getContractData(input.marketID.toString());
      const markets = calcOptOrder(contractData);
      return markets;
    }),
});
