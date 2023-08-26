import { VALIDATION_MESSAGES } from "@/constant/messages"
import { GROUP_VARIANT_VALUE_REGEX, UNIQUE_IDENTIFIED } from "@/constant/regexs"
import { safeParseNumber } from "@/lib/number"
import { z } from "zod"

export const productVariantAttributeSchema = z.object({
  id: z.string().nullish(),
  photo: z.string().nullish(),
  SKU: z.string(),
  attributes: z.preprocess(
    (values) => {
      if (typeof values === "string") {
        const splitGroupAttributeOptsFromString = values.split("@")
        const groupAttributeOpts = splitGroupAttributeOptsFromString.map((groupAttribute) => {
          const matchValues = groupAttribute.match(GROUP_VARIANT_VALUE_REGEX)
          const [id, attributeId, code, name] = [
            matchValues?.[1] as string,
            matchValues?.[2] as string,
            matchValues?.[3] as string,
            matchValues?.[4] as string,
          ]

          return {
            id,
            attributeId,
            code,
            name,
          }
        })

        console.log("groupAttributeOpts", groupAttributeOpts)
        console.log("values", values)
        return groupAttributeOpts
      }

      return values
    },
    z.array(
      z.object({
        id: z.string(),
        attributeId: z.string(),
        name: z.string().optional(),
        code: z.string().optional(),
      })
    )
  ),
  price: z.number(
    z.preprocess((value) => safeParseNumber(value as any, 0), z.number().default(0.0))
  ),
  quantity: z.number(z.preprocess((qty) => safeParseNumber(qty as any, 0), z.number())),
  stockAvailability: z.boolean(
    z.preprocess((value) => (typeof value === "string" && value === "yes") || !!value, z.boolean())
  ),
  visible: z.boolean(
    z.preprocess((value) => (typeof value === "string" && value === "yes") || !!value, z.boolean())
  ),
})

export const productSchema = z.object({
  id: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED("ID") }).optional(),
  title: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Product name") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Product name")),
  slug: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Slug") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Slug"))
    .regex(UNIQUE_IDENTIFIED, VALIDATION_MESSAGES.URL_INVALID("slug")),
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
    .min(1, VALIDATION_MESSAGES.REQUIRED("Description")),
  // .nullable()
  // .optional(),
  attributeGroupId: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Attribute Group") })
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
  variants: z.array(productVariantAttributeSchema),
  quantity: z.preprocess((v) => Number(v), z.number().positive()),
  metadata: z.object({
    metaTitle: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED("Title") }).optional(),
    metaKeyword: z.string({ required_error: VALIDATION_MESSAGES.REQUIRED("Keywords") }).optional(),
    metaDescription: z
      .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Description") })
      .optional(),
  }),
})

export type ProductSchemaType = z.infer<typeof productSchema>
