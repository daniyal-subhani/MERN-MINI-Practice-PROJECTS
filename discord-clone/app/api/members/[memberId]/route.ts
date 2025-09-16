import { db } from "@/lib/db-hot-reloading";
import { getCurrentProfile } from "@/lib/getCurrent-profile";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const { role } = await req.json();
    const profile = await getCurrentProfile();
    if (!profile) {
      return new NextResponse("Profile Missing", { status: 401 });
    }
    if (!serverId) {
      return new NextResponse("missing server id", { status: 401 });
    }
    if (!params.memberId) {
      return new NextResponse("missing memberId", { status: 401 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id,
              },
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log("MEMBER_ID_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
