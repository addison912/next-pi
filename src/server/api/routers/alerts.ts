import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { getUserByClerkID } from "@/utils/auth";
import { z } from "zod";

export const alertRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        marketID: z.string().min(4),
        value: z.number(),
        type: z.string(),
        maxFreq: z.number(),
        active: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await getUserByClerkID();
      const alert = await ctx.db.alert.create({
        data: {
          marketID: input.marketID,
          value: input.value,
          type: input.type,
          maxFreq: input.maxFreq,
          active: input.active,
          userID: user.id,
        },
      });
      return alert;
    }),

  getUserAlerts: publicProcedure.query(async ({ ctx }) => {
    const user = await getUserByClerkID();
    const alerts = ctx.db.alert.findMany({
      where: {
        userID: user.id,
      },
      select: {
        id: true,
        marketID: true,
        type: true,
        value: true,
        active: true,
        maxFreq: true,
      },
    });
    return alerts;
  }),
  getUserAlertByMarket: publicProcedure
    .input(
      z.object({
        marketID: z.string().min(4),
      }),
    )
    .query(async ({ input, ctx }) => {
      const user = await getUserByClerkID();
      const alert = await ctx.db.alert.findUnique({
        where: {
          userID_marketID: {
            userID: user.id,
            marketID: input.marketID,
          },
        },
      });
      return alert;
    }),
  updateAlert: publicProcedure
    .input(
      z.object({
        marketID: z.string().min(4),
        value: z.number(),
        type: z.string(),
        maxFreq: z.number(),
        active: z.boolean(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const user = await getUserByClerkID();
      const alert = await ctx.db.alert.update({
        where: {
          userID_marketID: {
            userID: user.id,
            marketID: input.marketID,
          },
        },
        data: {
          value: input.value,
          type: input.type,
          maxFreq: input.maxFreq,
          active: input.active,
        },
      });
      return alert;
    }),
});
