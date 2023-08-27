import prisma from "@/lib/prisma"
import { ProductSchemaType } from "@/schemas/product"
import {
  Prisma,
  ProductVariant,
  ProductVariantAttribute,
  ProductVisibility,
  Status,
} from "@prisma/client"
import { ProductCreateInputSchema, ProductUpdateInputSchema } from "./input"

export interface UpdateProductVariantsResult {}

export interface UpdateProductVariantsReduceResult {
  creates: ProductSchemaType["variants"]
  updates: ProductSchemaType["variants"]
  deletes: Record<string, ProductVariant & { attributes: ProductVariantAttribute[] }>
}

export interface ProductServiceDetailOptions {
  include?: Partial<Record<"media" | "metadata" | "category", boolean>>
}

class ProductService {
  detail(id: string, options?: ProductServiceDetailOptions) {
    return prisma.product.findFirst({
      where: { id },
      include: {
        media: options?.include?.media,
        category: options?.include?.category,
        metadata: options?.include?.metadata,

        variants: {
          include: {
            attributes: {
              include: {
                productAttributeOption: true,
              },
            },
          },
        },
      },
    })
  }

  createMetadata(metadata: ProductCreateInputSchema["metadata"], stickWithProductId: string) {
    return prisma.productMetadata.create({
      data: {
        metaTitle: metadata.metaTitle,
        metaDescription: metadata.metaDescription,
        metaKeyword: metadata.metaKeyword,
        Product: {
          connect: {
            id: stickWithProductId,
          },
        },
      },
    })
  }

  async createVariants(variants: ProductCreateInputSchema["variants"], belongsToProductId: string) {
    const objectVariantAttributesReq = variants.reduce(
      (totalVariants, variant) => ({
        ...totalVariants,
        [variant.SKU]: variant.attributes,
      }),
      {} as Record<string, ProductCreateInputSchema["variants"][0]["attributes"]>
    )

    return prisma
      .$transaction(
        variants.map((productVariantReq) => {
          const createVariantData = {
            SKU: productVariantReq.SKU,
            photo: productVariantReq.photo,
            price: productVariantReq.price,
            visible: productVariantReq.visible,
            quantity: productVariantReq.quantity,
            productId: belongsToProductId,
            stockAvailability: productVariantReq.stockAvailability,
          }

          return prisma.productVariant.create({
            data: {
              ...createVariantData,
            },
          })
        })
      )
      .then(async (productVariantCreatedResults) => {
        await prisma.$transaction(
          productVariantCreatedResults.map((productVariantResultItem) => {
            const attributes = objectVariantAttributesReq[productVariantResultItem.SKU as string]

            return prisma.productVariantAttribute.createMany({
              data: attributes.map((attributeReq) => {
                return {
                  productAttributeId: attributeReq.attributeId,
                  productAttributeOptionId: attributeReq.id,
                  productVariantId: productVariantResultItem.id,
                }
              }),
            })
          })
        )
      })
  }

  create(input: Omit<ProductCreateInputSchema, "variants">) {
    return prisma.product.create({
      data: {
        title: input.title,
        description: input.description,
        price: input.price,
        quantity: input.quantity,
        slug: input.slug,
        thumbnail: input.thumbnail,
        categoryId: input.categoryId,
        content: input.content,
        status: input.status as Status,
        stockAvailability: input.stockAvailability,
        visibility: input.visibility as ProductVisibility,
        attributeGroupId: input.attributeGroupId,
      },
    })
  }

  updateVariantAttributes(
    variantRecords: ProductUpdateInputSchema["variants"],
    recordProductVariants: Record<
      string,
      ProductVariant & { attributes: ProductVariantAttribute[] }
    >
  ) {
    return prisma.$transaction(
      variantRecords.map((variant) => {
        const currentVariantData = recordProductVariants[variant.id as string]

        const isSameAllAttributes = variant.attributes.every((requestAttributeFromClient) => {
          const variantAttribute = currentVariantData?.attributes.find(
            (currentVariantAttribute) => {
              const isEqualOptionId =
                currentVariantAttribute.productAttributeOptionId === requestAttributeFromClient.id
              const isEqualAttributeId =
                requestAttributeFromClient.attributeId ===
                currentVariantAttribute.productAttributeId

              return isEqualAttributeId && isEqualOptionId
            }
          )

          return !!variantAttribute
        })

        const productVariantAttributesUpdateConnection = {} as
          | Prisma.ProductVariantAttributeUncheckedUpdateManyWithoutProductVariantNestedInput
          | Prisma.ProductVariantAttributeUpdateManyWithoutProductVariantNestedInput

        if (!isSameAllAttributes) {
          productVariantAttributesUpdateConnection.deleteMany = {
            productVariantId: variant.id as string,
          }

          productVariantAttributesUpdateConnection.createMany = {
            data: variant.attributes.map((variantAttribute) => {
              return {
                // productVariantId: variant.id as string,
                productAttributeId: variantAttribute.attributeId as string,
                productAttributeOptionId: variantAttribute.id as string,
              }
            }),
          }
        }

        return prisma.productVariant.update({
          where: { id: variant.id as string },
          data: {
            SKU: variant.SKU,
            price: variant.price,
            photo: variant.photo,
            visible: variant.visible,
            quantity: variant.quantity,
            stockAvailability: variant.stockAvailability,
            attributes: productVariantAttributesUpdateConnection,
          },
        })
      })
    )
  }

  async updateVariants(
    changesVariants: ProductUpdateInputSchema["variants"],
    productId: string
  ): Promise<UpdateProductVariantsResult> {
    const currentProductVariants = await prisma.productVariant.findMany({
      where: { productId: productId },
      include: {
        attributes: true,
      },
    })

    const objectProductVariants = currentProductVariants.reduce(
      (objectProductVariantsShadow, productVariant) => ({
        ...objectProductVariantsShadow,
        [productVariant.id]: productVariant,
      }),
      {} as Record<string, ProductVariant & { attributes: ProductVariantAttribute[] }>
    )

    const { creates, updates, deletes } = changesVariants.reduce(
      (results, variant) => {
        if (variant.id) {
          const includedVariant = Object.keys(objectProductVariants).includes(variant.id)

          if (includedVariant) {
            results.updates.push(variant)
            delete results.deletes[variant.id]
          }

          return results
        }

        results.creates.push(variant)

        return results
      },
      {
        creates: [],
        updates: [],
        deletes: objectProductVariants,
      } as UpdateProductVariantsReduceResult
    )

    const deleteVariantIds = Object.keys(deletes)

    await this.deleteVariants(deleteVariantIds)
    await this.createVariants(creates, productId)
    await this.updateVariantAttributes(updates, objectProductVariants)

    return {}
  }

  updateMetadata(metadata: ProductUpdateInputSchema["metadata"], metadataId: string) {
    return prisma.productMetadata.update({
      where: {
        id: metadataId as string,
      },
      data: {
        metaTitle: metadata.metaTitle,
        metaDescription: metadata.metaDescription,
        metaKeyword: metadata.metaKeyword,
      },
    })
  }

  update(input: Omit<ProductUpdateInputSchema, "variants">) {
    return prisma.product.update({
      data: {
        title: input.title,
        description: input.description,
        price: input.price,
        quantity: input.quantity,
        slug: input.slug,
        thumbnail: input.thumbnail,
        categoryId: input.categoryId,
        content: input.content,
        status: input.status as Status,
        stockAvailability: input.stockAvailability,
        visibility: input.visibility as ProductVisibility,
        attributeGroupId: input.attributeGroupId,
      },
      where: { id: input.id },
    })
  }

  async deleteVariants(productIdOrSelfIds: string | string[]) {
    const conditionFindManyVariants: Prisma.Enumerable<Prisma.ProductVariantWhereInput> =
      Array.isArray(productIdOrSelfIds)
        ? {
            id: { in: productIdOrSelfIds },
          }
        : { productId: productIdOrSelfIds }

    const productVariantSelectIds = await prisma.productVariant.findMany({
      where: conditionFindManyVariants,
      select: { id: true },
    })

    const productVariantIds = productVariantSelectIds.map(({ id }) => id)

    // Delete constraint product variant -> attribute
    await prisma.productVariantAttribute.deleteMany({
      where: {
        productVariantId: {
          in: productVariantIds,
        },
      },
    })

    return prisma.productVariant.deleteMany({
      where: {
        id: { in: productVariantIds },
      },
    })
  }

  permanentlyDelete(id: string) {
    return prisma.product.delete({
      where: { id },
      include: {
        metadata: true,
      },
    })
  }
}

const productService = new ProductService()

export default productService
