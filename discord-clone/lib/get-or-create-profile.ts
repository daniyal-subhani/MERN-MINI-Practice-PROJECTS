import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "./db-hot-reloading";


export const getOrCreateProfile = async () => {
    const user = await currentUser();
    if(!user) {
        return (
            redirect('/sign-in')
        )
    }
    const profile = await db.profile.findUnique({
        where: {
            userId: user.id
        }
    })
    if(profile) return profile;
    const newProfile = await db.profile.create({
        data: {
            userId: user.id,
            name: `${user.firstName} ${user.lastName}` ,
            email: user.emailAddresses[0]?.emailAddress,
            imageUrl: user.imageUrl

        }
    })
    return newProfile;
}
