import { auth } from "@clerk/nextjs";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
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
