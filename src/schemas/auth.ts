import { PASSWORD_REGEX } from "@/constant/regexs"
import { z } from "zod"

export const signInSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
})

export type SignInSchemaType = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  email: z.string().min(3).email(),
  password: z
    .string()
    .min(8)
    .regex(
      PASSWORD_REGEX,
      "Password requires minimum 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character"
    ),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>
