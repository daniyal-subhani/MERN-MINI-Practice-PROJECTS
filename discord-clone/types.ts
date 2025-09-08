import { z  } from "zod";

export const formSchema = z.object({
    serverName: z.string().min(1, "Server name is required!"),
    serverImage: z.string().min(1, "Server image is required!"),
})

export type FormData = z.infer<typeof formSchema>;