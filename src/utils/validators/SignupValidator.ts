import { z } from "zod"

export type SignUpInformation = z.infer<typeof SignUpValidator>

export const SignUpValidator = z
  .object({
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long" })
      .max(20, { message: "Username cannot exceed 20 characters" }),
    email: z.string().email(),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters long" }),
    passwordVerification: z.string(),
  })
  .refine((data) => data.password === data.passwordVerification, {
    message: "Password don't match",
    path: ["passwordVerification"],
  })
