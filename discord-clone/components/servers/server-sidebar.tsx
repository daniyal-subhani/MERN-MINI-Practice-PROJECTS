import { db } from "@/lib/db-hot-reloading";
import { getCurrentProfile } from "@/lib/getCurrent-profile";
import { ChannelType } from "@prisma/client";
import { channel } from "diagnostics_channel";
import { redirect } from "next/navigation";
import React from "react";
import { ServerHeader } from "./server-header";

interface ServerSidebarProps {
  serverId: string;
}
const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
    const profile = await getCurrentProfile()
    if(!profile) {
        return redirect("/")
    }
  const server = await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: "asc",
        },
      },
      members: {
        include: {
          profile: true,
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });
  if (!server) {
    return redirect("/");
  }
  const textChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = server?.channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );
 const members = server?.members.filter((channel) => channel.profileId !== profile.id)
 const role = server?.members.find((member)=> member.profileId === profile.id)?.role


  return <div className="bg-gray-100 dark:bg-zinc-800 h-full flex flex-col text-primary w-full">
    <ServerHeader server={server} role={role} />
  </div>;
};

export default ServerSidebar;
