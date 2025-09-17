import { db } from "@/lib/db-hot-reloading";
import { getCurrentProfile } from "@/lib/getCurrent-profile";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await getCurrentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!params.serverId) {
      return new NextResponse("Server ID Missing", { status: 401 });
    }
    const server = await db.server.update({
      where: {
        id: params?.serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (err) {
    console.log("[SERVER_LEAVE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
