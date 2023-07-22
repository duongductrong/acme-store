import { hashPassword } from "@/lib/bcrypt"
import prisma from "@/lib/prisma"
import { publicProcedure, router } from "@/app/(trpc)/bootstrap/trpc"
import { signUpSchema } from "@/schemas/auth"
import { z } from "zod"

export const authRouter = router({
  signUp: publicProcedure
    .input(
      z
        .object({
          email: signUpSchema.shape.email.refine(
            async (email) =>
              await prisma.user.findFirst({
                where: { email },
              }),
            "The email address provided already exists"
          ),
        })
        .extend(signUpSchema.shape)
    )
    .mutation(async ({ input }) => {
      const { email, firstName, lastName, password } = input

      const passwordHashed = await hashPassword(password)

      const createdUser = await prisma.user.create({
        data: {
          email,
          code: new Date().getTime().toString(),
          firstName,
          lastName,
          passwordHashed,
          roleId: "clke4eigd0000kj7tossctmwc",
        },
      })

      return createdUser
    }),
})
