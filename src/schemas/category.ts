import { z } from "zod"

export const categorySchema = z.object({
  id: z.string().optional(),

  name: z.string(),
  description: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),
  status: z.string(),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),

  metadata: z
    .object({
      metaSeoTitle: z.string().optional(),
      metaSeoKeyword: z.string().optional(),
      metaSeoDescription: z.string().optional(),
    })
    .optional(),
})

export type CategorySchemaType = z.infer<typeof categorySchema>
