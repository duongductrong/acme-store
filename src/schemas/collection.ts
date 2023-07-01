import { z } from "zod"

export const collectionSchema = z.object({
  id: z.string().nullable().optional(),
  name: z.string(),
  code: z.string(),
  description: z.string().nullable().optional(),
})

export type CollectionSchemaType = z.infer<typeof collectionSchema>
