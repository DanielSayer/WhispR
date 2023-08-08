import { z } from "zod"

export type LoginInformation = z.infer<typeof LoginValidator>

export const LoginValidator = z.object({
  email: z.string().email(),
  password: z.string(),
})
