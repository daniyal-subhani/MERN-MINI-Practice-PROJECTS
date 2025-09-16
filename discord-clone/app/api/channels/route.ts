import { db } from "@/lib/db-hot-reloading";
import { getCurrentProfile } from "@/lib/getCurrent-profile";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const profile = await getCurrentProfile();
    const { name, type } = await req.json();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!profile) {
      return new NextResponse("profile id missing", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("server id missing", { status: 401 });
    }
    if (name === "general") {
      return new NextResponse("Name cannot be 'general'", { status: 401 });
    }
    const server =await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: {
            profileId: profile.id,
            name,
            type,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (err) {
    console.log("[CHANNEL_CREATION]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
