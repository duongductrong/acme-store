import { z } from "zod"

export const productSchema = z.object({
  id: z.string().optional(),
  productName: z.string().min(1),
  slug: z.string().min(1),
  SKU: z.string().min(1),
  thumbnail: z.string().min(1),
  media: z.array(z.string()).optional(),
  price: z.preprocess((v) => Number(v), z.number().positive()),
  description: z.string().min(1),
  categoryId: z.string().nullable().optional(),
  content: z.string().nullable().optional(),
  status: z.string().min(1),
  visibility: z.string().min(1),
  stockAvailability: z.preprocess(
    (value) => (typeof value === "string" && value === "yes") || !!value,
    z.boolean()
  ),
  quantity: z.preprocess((v) => Number(v), z.number().positive()),
  metadata: z.object({
    metaSeoTitle: z.string().optional(),
    metaSeoKeyword: z.string().optional(),
    metaSeoDescription: z.string().optional(),
  }),
})

export type ProductSchemaType = z.infer<typeof productSchema>
