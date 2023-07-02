import { ProductAttributeType } from "@prisma/client"
import { z } from "zod"

export const attributeSchema = z.object({
  id: z.string().nullable().optional(),
  name: z.string().min(1),
  type: z
    .string()
    .refine(
      (type) =>
        Object.values(ProductAttributeType).includes(
          type as ProductAttributeType
        ),
      {
        message:
          "This field should contains in " +
          Object.values(ProductAttributeType).join(", "),
      }
    ),
  code: z.string().min(1),
  sortOrder: z
    .number()
    .min(0)
    .or(z.string())
    .transform((value) => Number(value)),
  options: z
    .array(z.object({ name: z.string().optional() }).optional())
    .optional()
    .default([]),
  isFilterable: z.boolean(),
  isRequired: z.boolean(),
  isShowToCustomer: z.boolean(),
  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),

  groupIds: z.array(z.string().optional()).optional(),
})

export type AttributeSchemaType = z.infer<typeof attributeSchema>

// export const attributeBelongsToGroupInputSchema = z.object({
//   attributeId: z.string(),
// })
