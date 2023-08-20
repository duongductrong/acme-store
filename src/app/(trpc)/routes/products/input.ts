import { VALIDATION_MESSAGES } from "@/constant/messages"
import prisma from "@/lib/prisma"
import { productSchema, productVariantAttributeSchema } from "@/schemas/product"
import { z } from "zod"
import { checkRuleUniqueProductVariantSku } from "./rules"

export const productDetailInputSchema = z.object({
  id: z.string(),
  includes: z.record(z.enum(["category", "media", "metadata"]), z.boolean()),
})

export const productCreateInputSchema = z
  .object({
    ...productSchema.shape,
    slug: productSchema.shape.slug.refine(async (slug) => {
      const product = await prisma.product.findFirst({
        where: { slug },
      })

      return !product
    }, VALIDATION_MESSAGES.ALREADY_EXISTS("slug")),
    variants: z.array(productVariantAttributeSchema),
  })
  .superRefine(async (values, ctx) => {
    checkRuleUniqueProductVariantSku({ variants: values.variants }, ctx, {})
    return ctx
  })

export const productUpdateInputSchema = z
  .object({
    ...productSchema.shape,
    id: z.string(),
    slug: productSchema.shape.slug,
  })
  .superRefine(async ({ slug, id, attributeGroupId, variants }, ctx) => {
    checkRuleUniqueProductVariantSku({ variants }, ctx, { excludeProductId: id })

    const [product, attributeGroup] = await prisma.$transaction([
      prisma.product.findFirst({
        where: { slug, NOT: { id } },
      }),
      prisma.productAttributeGroup.findFirst({
        where: { id: attributeGroupId?.toString() },
      }),
    ])

    if (product) {
      ctx.addIssue({
        message: VALIDATION_MESSAGES.ALREADY_EXISTS("Slug"),
        code: "custom",
        path: ["slug"],
      })
    }

    if (!attributeGroup) {
      ctx.addIssue({
        message: VALIDATION_MESSAGES.NOT_EXISTS("Attribute Group"),
        code: "custom",
        path: ["attributeGroupId"],
      })
    }

    return ctx
  })

export type ProductDetailInputSchema = z.infer<typeof productDetailInputSchema>
export type ProductCreateInputSchema = z.infer<typeof productCreateInputSchema>
export type ProductUpdateInputSchema = z.infer<typeof productUpdateInputSchema>
