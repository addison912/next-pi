import { auth } from "@clerk/nextjs/server";
import { db } from "@/server/db";

export const getUserByClerkID = async () => {
  const { userId } = auth();
  const user = await db.user.findUniqueOrThrow({
    where: {
      clerkId: userId!,
    },
    select: { id: true },
  });
  return user;
};
