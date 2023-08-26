import { attributeGroupSchema } from "@/schemas/attribute-group"
import { z } from "zod"

export const attributeGroupCreateInputSchema = attributeGroupSchema

export type AttributeGroupCreateInputSchema = z.infer<typeof attributeGroupCreateInputSchema>
