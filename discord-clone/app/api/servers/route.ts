import { db } from "@/lib/db-hot-reloading";
import { getCurrentProfile } from "@/lib/getCurrent-profile";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const profile = await getCurrentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const newServer = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: uuid(),
        channels: {
          create: [{ name: "general", profileId: profile.id }],
        },
        members: {
          create: [{ profileId: profile.id, role: MemberRole.ADMIN }],
        },
      },
    });
    return NextResponse.json(newServer);
  } catch (error) {
    console.log("Something Went Wrong in [SERVERS_POST]", error);

    return new NextResponse("Internal Error", { status: 500 });
  }
}
