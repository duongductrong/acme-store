import { VALIDATION_MESSAGES } from "@/constant/messages"
import prisma from "@/lib/prisma"
import { attributeSchema } from "@/schemas/attribute"
import { z } from "zod"
import { inputQueryFilterSchema } from "../../lib/trpc/schemas"

export const attributeListInputSchema = z
  .intersection(
    z
      .object({
        includes: z.record(z.enum(["groups"]), z.boolean()).optional(),
      })
      .optional(),
    inputQueryFilterSchema.optional()
  )
  .optional()

export const attributeCreateInputSchema = attributeSchema.superRefine(async (values, ctx) => {
  const attribute = await prisma.productAttribute.findFirst({
    where: { code: values.code },
  })

  if (attribute) {
    ctx.addIssue({
      code: "custom",
      message: VALIDATION_MESSAGES.ALREADY_EXISTS("Code"),
      path: ["code"],
    })
  }

  return ctx
})

export const attributeUpdateInputSchema = z
  .object({ id: z.number().min(1) })
  .extend(attributeSchema.shape)
  .superRefine(async (values, ctx) => {
    const attribute = await prisma.productAttribute.findFirst({
      where: { code: values.code, id: { not: values.id?.toString() } },
    })

    if (attribute) {
      ctx.addIssue({
        code: "custom",
        message: VALIDATION_MESSAGES.ALREADY_EXISTS("Code"),
        path: ["code"],
      })
    }

    return ctx
  })

export type AttributeCreateInputSchema = z.infer<typeof attributeCreateInputSchema>
export type AttributeUpdateInputSchema = z.infer<typeof attributeUpdateInputSchema>
