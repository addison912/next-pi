import { db } from "@/server/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createUser = async () => {
  const user = await currentUser();

  const match = await db.user.findUnique({
    where: { clerkId: user?.id as string },
  });

  if (!match)
    await db.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0]?.emailAddress as string,
      },
    });

  redirect("/market");
};

const NewUser = async () => {
  await createUser();
  return <div>loading ...</div>;
};

export default NewUser;
