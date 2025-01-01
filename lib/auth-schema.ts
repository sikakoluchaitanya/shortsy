import { z } from "zod";

export const formSchema = z.object({
    name: z
        .string()
        .min(1, { message: "Name is required"})
        .max(125, { message: "Name must be at most 125 characters"}),
    
    email: z
        .string()
        .email({ message: "Invalid email"}),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters"})
        .max(64),
})

export const signInFormSchema = formSchema.pick({
    email: true,
    password: true,
})