import { publicProcedure, router } from "@/app/(trpc)/bootstrap/trpc"
import { hashPassword } from "@/lib/bcrypt"
import prisma from "@/lib/prisma"
import { signUpSchema } from "@/schemas/auth"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import settingService from "../settings/service"

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

      const setting = await settingService.setting()

      if (!setting?.autoAssignStorefrontRoleId)
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "New user registration is not possible, as the system is missing the 'autoAssignStorefrontRoleId'.",
        })

      const createdUser = await prisma.user.create({
        data: {
          email,
          code: new Date().getTime().toString(),
          firstName,
          lastName,
          passwordHashed,
          roleId: setting.autoAssignStorefrontRoleId,
        },
      })

      return createdUser
    }),
})
