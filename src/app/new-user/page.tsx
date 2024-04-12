import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/server/db";

const createUser = async () => {
  const user = await currentUser();
  if (!user?.emailAddresses[0]?.emailAddress) {
    return new Error("No user found");
  }
  const match = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (!match)
    await db.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });

  redirect("/market");
};

const NewUser = async () => {
  await createUser();
  return <div>loading ...</div>;
};

export default NewUser;
