import { VALIDATION_MESSAGES } from "@/constant/messages"
import { UNIQUE_IDENTIFIED } from "@/constant/regexs"
import { z } from "zod"

export const productSchema = z.object({
  id: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("ID") })
    .optional(),
  title: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Product name") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Product name")),
  slug: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Slug") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Slug"))
    .regex(UNIQUE_IDENTIFIED, VALIDATION_MESSAGES.URL_INVALID("slug")),
  SKU: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("SKU") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("SKU")),
  thumbnail: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Thumbnail") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Thumbnail")),
  media: z.array(z.string()).optional(),
  price: z.preprocess((v) => Number(v), z.number().positive()),
  description: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Description") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Description")),
  categoryId: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Category") })
    .nullable()
    .optional(),
  content: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Content") })
    .nullable()
    .optional(),
  status: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Status") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Status")),
  visibility: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Visibility") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Visibility")),
  stockAvailability: z.preprocess(
    (value) => (typeof value === "string" && value === "yes") || !!value,
    z.boolean()
  ),
  quantity: z.preprocess((v) => Number(v), z.number().positive()),
  metadata: z.object({
    metaTitle: z
      .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Title") })
      .optional(),
    metaKeyword: z
      .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Keywords") })
      .optional(),
    metaDescription: z
      .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Description") })
      .optional(),
  }),
})

export type ProductSchemaType = z.infer<typeof productSchema>
