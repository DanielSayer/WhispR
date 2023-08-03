import { z } from "zod"

export type LoginInformation = z.infer<typeof LoginValidator>

export const LoginValidator = z.object({
  username: z.string(),
  password: z.string(),
})
