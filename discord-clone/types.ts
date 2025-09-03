import * as z from "zod";

export const formSchema = z.object({
    serverName: z.string().min(1, {
        message: "Server name is required"
    }),
    serverImage: z.string().min(1, {
        message: "Server image is required"
    })
})

export type InitialModelSchema = z.infer<typeof formSchema>;