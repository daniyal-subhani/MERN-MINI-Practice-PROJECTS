
import { auth } from "@clerk/nextjs/server";
import { db } from "./db-hot-reloading";

export const getCurrentProfile = async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const userProfile = await db.profile.findUnique({
    where: {
      userId,
    },
  });
  return userProfile;
};
