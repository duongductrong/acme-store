import { VALIDATION_MESSAGES } from "@/constant/messages"
import prisma from "@/lib/prisma"
import { roleSchema } from "@/schemas/role"
import { z } from "zod"
import { inputQueryFilterSchema } from "../../lib/trpc/schemas"

export const roleListInputSchema = inputQueryFilterSchema.optional()
export const roleDetailInputSchema = z.object({
  id: roleSchema.shape.id
    .refine((val) => {
      return !!val
    }, VALIDATION_MESSAGES.REQUIRED("Id"))
    .transform((v) => String(v)),
})
export const roleCreateInputSchema = roleSchema
export const roleUpdateInputSchema = z
  .object({
    id: z.string().min(1),
  })
  .extend(roleSchema.shape)
  .superRefine(async ({ id }, ctx) => {
    const role = await prisma.role.findFirst({
      where: { id: id?.toString() },
    })

    if (!role)
      ctx.addIssue({
        code: "custom",
        message: VALIDATION_MESSAGES.NOT_EXISTS("Name"),
        params: {},
        path: ["name"],
      })

    return ctx
  })
export const roleDeleteInputSchema = z.object({ id: z.string() })

export type RoleListInputSchema = z.infer<typeof roleListInputSchema>
export type RoleDetailInputSchema = z.infer<typeof roleDetailInputSchema>
export type RoleCreateInputSchema = z.infer<typeof roleCreateInputSchema>
export type RoleUpdateInputSchema = z.infer<typeof roleUpdateInputSchema>
