import { VALIDATION_MESSAGES } from "@/constant/messages"
import prisma from "@/lib/prisma"
import { ProductSchemaType } from "@/schemas/product"
import { isNil, omitBy } from "lodash"
import { z } from "zod"

export interface CheckRuleUniqueProductVariantSkuArgs {
  excludeProductId?: string
}

export const checkRuleUniqueProductVariantSku = async (
  values: Pick<ProductSchemaType, "variants">,
  ctx: z.RefinementCtx,
  options: CheckRuleUniqueProductVariantSkuArgs
) => {
  const variantSKUs = values.variants.reduce((reducedVariantSKUs, variant, index) => {
    return {
      ...reducedVariantSKUs,
      [variant.SKU]: index,
    }
  }, {} as Record<string, number>)

  const variantSKUIds = Object.keys(variantSKUs)

  const isNotUniqueVariantSKU = variantSKUIds.length !== values.variants.length
  const excludeProductIdOrNot = options.excludeProductId
    ? { not: options.excludeProductId }
    : undefined

  // Validating SKU from request is conflict
  if (isNotUniqueVariantSKU) {
    ctx.addIssue({
      code: "custom",
      path: [`variants.0.SKU`],
      message: VALIDATION_MESSAGES.UNIQUE("SKU"),
    })

    return ctx
  }

  const productVariantsNotUniqueBySKU = await prisma.productVariant.findMany({
    where: omitBy(
      {
        SKU: { in: Object.keys(variantSKUs) },
        productId: excludeProductIdOrNot,
      },
      isNil
    ),
    select: { SKU: true },
  })

  if (productVariantsNotUniqueBySKU.length) {
    productVariantsNotUniqueBySKU.forEach((productVariant) => {
      const variantIndex = variantSKUs[productVariant.SKU as string]

      ctx.addIssue({
        code: "custom",
        path: [`variants.${variantIndex}.SKU`],
        message: VALIDATION_MESSAGES.ALREADY_EXISTS("SKU"),
      })
    })
  }

  return ctx
}
