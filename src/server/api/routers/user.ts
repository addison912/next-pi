import { z } from "zod";
import { auth } from "@clerk/nextjs";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  //   hello: publicProcedure
  //     .input(z.object({ text: z.string() }))
  //     .query(({ input }) => {
  //       return {
  //         greeting: `Hello ${input.text}`,
  //       };
  //     }),

  //   create: publicProcedure
  //     .input(z.object({ name: z.string().min(1) }))
  //     .mutation(async ({ ctx, input }) => {
  //       // simulate a slow db call
  //       await new Promise((resolve) => setTimeout(resolve, 1000));

  //       return ctx.db.post.create({
  //         data: {
  //           name: input.name,
  //         },
  //       });
  //     }),

  getUserByClerkId: publicProcedure.query(({ ctx }) => {
    const { userId } = auth();
    const user = ctx.db.user.findUniqueOrThrow({
      where: {
        clerkId: userId!,
      },
      select: { id: true },
    });
    return user;
  }),
});
