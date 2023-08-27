import { VALIDATION_MESSAGES } from "@/constant/messages"
import prisma from "@/lib/prisma"
import { collectionSchema } from "@/schemas/collection"
import { z } from "zod"
import { inputQueryFilterSchema } from "../../lib/trpc/schemas"

export const collectionListInputSchema = inputQueryFilterSchema.optional()

export const collectionDetailInputSchema = z.string().or(z.string())

export const collectionCreateInputSchema = collectionSchema.superRefine(async (values, ctx) => {
  const collection = await prisma.collection.findFirst({
    where: {
      slug: values.slug,
    },
  })

  if (collection) {
    return ctx.addIssue({
      message: VALIDATION_MESSAGES.ALREADY_EXISTS("Slug"),
      path: ["slug"],
      code: "custom",
    })
  }

  return ctx
})

export const collectionUpdateInputSchema = z
  .object({ id: z.string() })
  .extend(collectionSchema.shape)
  .superRefine(async (values, ctx) => {
    const collection = await prisma.collection.findFirst({
      where: {
        slug: values.slug,
        id: {
          not: values.id as string,
        },
      },
    })

    if (collection) {
      return ctx.addIssue({
        message: VALIDATION_MESSAGES.ALREADY_EXISTS("Slug"),
        path: ["slug"],
        code: "custom",
      })
    }

    return ctx
  })

export const collectionDeleteInputSchema = z.string()

export type CollectionListInputSchema = z.infer<typeof collectionListInputSchema>
export type CollectionDetailInputSchema = z.infer<typeof collectionDetailInputSchema>
export type CollectionCreateInputSchema = z.infer<typeof collectionCreateInputSchema>
export type CollectionUpdateInputSchema = z.infer<typeof collectionUpdateInputSchema>
export type CollectionDeleteInputSchema = z.infer<typeof collectionDeleteInputSchema>
