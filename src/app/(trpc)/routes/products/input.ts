import { VALIDATION_MESSAGES } from "@/constant/messages"
import prisma from "@/lib/prisma"
import { productSchema, productVariantAttributeSchema } from "@/schemas/product"
import { uniq } from "lodash"
import { z } from "zod"

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
    SKU: productSchema.shape.SKU.refine(async (SKU) => {
      const product = await prisma.product.findFirst({
        where: { SKU },
      })

      return !product
    }, VALIDATION_MESSAGES.ALREADY_EXISTS("SKU")),
    variants: z.array(productVariantAttributeSchema),
  })
  .superRefine(async (values, ctx) => {
    const variantSKUs = values.variants.reduce((reducedVariantSKUs, variant, index) => {
      return {
        ...reducedVariantSKUs,
        [variant.SKU]: index,
      }
    }, {} as Record<string, number>)

    const variantSKUIds = Object.keys(variantSKUs)
   
    const isNotUniqueVariantSKU = variantSKUIds.length !== values.variants.length
    
    if (isNotUniqueVariantSKU) {
      ctx.addIssue({
        code: "custom",
        path: [`variants.0.SKU`],
        message: VALIDATION_MESSAGES.UNIQUE("SKU"),
      })

      return ctx
    }

    const productVariantsNotUniqueBySKU = await prisma.productVariant.findMany({
      where: { SKU: { in: Object.keys(variantSKUs) } },
      select: { SKU: true },
    })

    if (productVariantsNotUniqueBySKU.length) {
      productVariantsNotUniqueBySKU.forEach((productVariant) => {
        const variantIndex = variantSKUs[productVariant.SKU]

        ctx.addIssue({
          code: "custom",
          path: [`variants.${variantIndex}.SKU`],
          message: VALIDATION_MESSAGES.ALREADY_EXISTS("SKU"),
        })
      })
    }

    return ctx
  })
