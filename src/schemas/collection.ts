import { z } from "zod"

export const collectionSchema = z.object({
  name: z.string(),
  code: z.string(),
  description: z.string().nullable().optional(),
  
})

export type CollectionSchemaType = z.infer<typeof collectionSchema>
