import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {
  getContractData,
  getMarketDetails,
  getProfitableMarkets,
} from "@/utils/predictit/api";
import { calcOptOrder } from "@/utils/predictit/risk";
import { z } from "zod";

export const alertRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        marketID: z.string().min(4),
        value: z.number(),
        type: z.string(),
      }),
    )
    .mutation(async ({ input }) => {}),
  getAll: publicProcedure.query(async () => {
    const alerts = await getProfitableMarkets();
    return alerts;
  }),
  getAlertsByUserID: publicProcedure
    .input(
      z.object({
        marketID: z.string().min(4),
      }),
    )
    .query(async ({ input }) => {
      return getMarketDetails(input.marketID.toString());
    }),
  getAlertsByMarket: publicProcedure
    .input(
      z.object({
        marketID: z.string().min(4),
        maxShares: z.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const contractData = await getContractData(input.marketID.toString());
      const markets = calcOptOrder(contractData, input.maxShares);
      return markets;
    }),
});
