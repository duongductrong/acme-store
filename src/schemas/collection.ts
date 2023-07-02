import { z } from "zod"

export const collectionSchema = z.object({
  id: z.number().nullable().optional(),
  name: z.string().min(1),
  code: z.string().min(1),
  description: z.string().nullable().optional(),
})

export type CollectionSchemaType = z.infer<typeof collectionSchema>
