import { ChannelType, Member, Profile, Server } from "@prisma/client";
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, "Server name is required!"),
  imageUrl: z.string().min(1, "Server image is required!"),
});

export type FormData = z.infer<typeof formSchema>;
export const formChannelSchema = z.object({
  name: z.string().min(1, "Server name is required!").refine((name) => name !==  "general", {
    message: "Channel name cannot be 'general'"
  }),
  type: z.nativeEnum(ChannelType),
});

export type FormChannelData = z.infer<typeof formChannelSchema>;

export type ServerWithMembersWithProfiles = Server & {
  members: (Member & { profile: Profile })[];
};
