import prisma from "@/lib/prisma"
import { ProductSchemaType } from "@/schemas/product"
import { ProductVisibility, Status } from "@prisma/client"
import { RouterInput } from "../../app-router"

export interface UpdateProductVariantsResult {}

export interface UpdateProductVariantsReduceResult {
  creates: ProductSchemaType["variants"]
  updates: ProductSchemaType["variants"]
  deletes: Record<string, boolean>
}

class ProductService {
  createMetadata(metadata: ProductSchemaType["metadata"], stickWithProductId: string) {
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

  async createVariants(variants: ProductSchemaType["variants"], belongsToProductId: string) {
    const objectVariantAttributesReq = variants.reduce(
      (totalVariants, variant) => ({
        ...totalVariants,
        [variant.SKU]: variant.attributes,
      }),
      {} as Record<string, ProductSchemaType["variants"][0]["attributes"]>
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
            const attributes = objectVariantAttributesReq[productVariantResultItem.SKU]

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

  create(input: Omit<ProductSchemaType, "variants">) {
    return prisma.product.create({
      data: {
        title: input.title,
        description: input.description,
        price: input.price,
        quantity: input.quantity,
        SKU: input.SKU,
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

  async updateProductVariants(
    productId: string,
    submittedVariants: RouterInput["product"]["update"]["variants"]
  ): Promise<UpdateProductVariantsResult> {
    const currentProductVariants = await prisma.productVariant.findMany({
      where: { productId: productId },
    })

    const objectProductVariantIds = currentProductVariants.reduce(
      (objectProductVariants, productVariant) => ({
        ...objectProductVariants,
        [productVariant.id]: true,
      }),
      {} as Record<string, boolean>
    )

    const { creates, updates, deletes } = submittedVariants.reduce(
      (results, variant) => {
        if (variant.id) {
          const includedVariant = Object.keys(objectProductVariantIds).includes(variant.id)

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
        deletes: objectProductVariantIds,
      } as UpdateProductVariantsReduceResult
    )

    console.log({ creates, updates, deletes })
    return {}
  }

  async deleteVariants(productId: string) {
    const productVariantSelectIds = await prisma.productVariant.findMany({
      where: {
        productId,
      },
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
