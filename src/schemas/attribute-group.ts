import { z } from "zod"

export const attributeGroupSchema = z.object({
  id: z.string().nullable().optional(),
  name: z.string().min(1),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),
})

export type AttributeGroupSchemaType = z.infer<typeof attributeGroupSchema>
