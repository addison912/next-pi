import { auth } from "@clerk/nextjs";
import { db } from "@/server/db";

export const getUserByClerkId = async (select = { id: true }) => {
  const { userId } = auth();
  const user = await db.user.findUniqueOrThrow({
    where: {
      clerkId: userId as string,
    },
    select,
  });

  return user;
};
