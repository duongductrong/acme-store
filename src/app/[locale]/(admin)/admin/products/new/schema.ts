import { z } from "zod"

export const productSchema = z.object({
  productName: z.string(),
  SKU: z.string(),
  price: z.preprocess((v) => Number(v), z.number().positive()),
  status: z.string(),
  visibility: z.string(),
  categoryId: z.string(),
  description: z.string(),
  stockAvailability: z.preprocess(
    (value) => typeof value === "string" && value === "yes",
    z.boolean()
  ),
  quantity: z.preprocess((v) => Number(v), z.number().positive()),
  metadata: z
    .object({
      metaSeoTitle: z.string(),
      metaSeoKeyword: z.string(),
      metaSeoDescription: z.string(),
    })
    .required(),
})
