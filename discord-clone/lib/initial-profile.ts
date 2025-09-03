import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { redirect } from "next/navigation";

export const getCurrentUser = async () => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const profile = await db.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (profile) return profile;

  const createProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });
  return createProfile;
};
