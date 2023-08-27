import { VALIDATION_MESSAGES } from "@/constant/messages"
import prisma from "@/lib/prisma"
import { categorySchema } from "@/schemas/category"
import { z } from "zod"
import { inputQueryFilterSchema } from "../../lib/trpc/schemas"

export const categoryListInputSchema = inputQueryFilterSchema.optional()

export const categoryDetailInputSchema = z.object({
  id: z.string(),
  includes: z.record(z.enum(["metadata"]), z.boolean()).optional(),
})

export const categoryCreateInputSchema = categorySchema.superRefine(async (values, ctx) => {
  const category = await prisma.category.findFirst({
    where: { slug: values.slug },
  })

  if (category) {
    return ctx.addIssue({
      message: VALIDATION_MESSAGES.ALREADY_EXISTS("Slug"),
      path: ["slug"],
      code: "custom",
    })
  }

  return ctx
})

export const categoryUpdateInputSchema = z
  .object({ id: z.string() })
  .extend(categorySchema.shape)
  .superRefine(async (values, ctx) => {
    const category = await prisma.category.findFirst({
      where: {
        slug: values.slug,
        id: {
          not: values.id,
        },
      },
    })

    if (category) {
      return ctx.addIssue({
        message: VALIDATION_MESSAGES.ALREADY_EXISTS("Slug"),
        path: ["slug"],
        code: "custom",
      })
    }

    return ctx
  })

export const categoryDeleteInputSchema = z.string()

export type CategoryListInputSchema = z.infer<typeof categoryListInputSchema>
export type CategoryDetailInputSchema = z.infer<typeof categoryDetailInputSchema>
export type CategoryCreateInputSchema = z.infer<typeof categoryCreateInputSchema>
export type CategoryUpdateInputSchema = z.infer<typeof categoryUpdateInputSchema>
export type CategoryDeleteInputSchema = z.infer<typeof categoryDeleteInputSchema>
