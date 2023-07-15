import { VALIDATION_MESSAGES } from "@/constant/messages"
import { z } from "zod"

export const categorySchema = z.object({
  id: z.string().optional(),
  name: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Name") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Name")),
  slug: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Slug") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Slug")),
  description: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Description") })
    .nullable()
    .optional(),
  banner: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Banner") })
    .nullable()
    .optional(),
  status: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Status") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Status")),

  createdAt: z.date().nullable().optional(),
  updatedAt: z.date().nullable().optional(),

  metadata: z
    .object({
      metaTitle: z
        .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Meta Title") })
        .optional(),
      metaKeyword: z
        .string({
          required_error: VALIDATION_MESSAGES.REQUIRED("Meta Keyword"),
        })
        .optional(),
      metaDescription: z
        .string({
          required_error: VALIDATION_MESSAGES.REQUIRED("Meta Description"),
        })
        .optional(),
    })
    .optional(),
})

export type CategorySchemaType = z.infer<typeof categorySchema>
