import prisma from "@/lib/prisma"
import { ProductAttributeOption } from "@prisma/client"
import { compact } from "lodash"
import { AttributeCreateInputSchema, AttributeUpdateInputSchema } from "./input"
import { getAttributeOptionsChangesFromAttribute } from "./utils"

class AttributeService {
  createOptions(data: Omit<ProductAttributeOption, "id">[] | Omit<ProductAttributeOption, "id">) {
    return prisma.productAttributeOption.createMany({
      data,
    })
  }

  updateOptions(
    option: Omit<ProductAttributeOption, "attributeId"> &
      Partial<Pick<ProductAttributeOption, "attributeId">>
  ) {
    return prisma.productAttributeOption.update({
      where: {
        id: option.id,
      },
      data: option,
    })
  }

  deleteOptions(optionOrAttributesIds: string[]) {
    return prisma.productAttributeOption.deleteMany({
      where: {
        OR: [
          {
            id: {
              in: optionOrAttributesIds,
            },
          },
          {
            attributeId: {
              in: optionOrAttributesIds,
            },
          },
        ],
      },
    })
  }

  disconnectAttributeGroup(attributeGroupOrAttributeIds: string[]) {
    return prisma.productAttributesOnGroups.deleteMany({
      where: {
        OR: [
          {
            productAttributeGroupId: {
              in: attributeGroupOrAttributeIds,
            },
          },
          {
            productAttributeId: {
              in: attributeGroupOrAttributeIds,
            },
          },
        ],
      },
    })
  }

  connectAttributeGroup(groupIds: string[], attributeId: string) {
    return prisma.productAttributesOnGroups.createMany({
      data: groupIds.map((attrGroupId) => ({
        productAttributeGroupId: attrGroupId as string,
        productAttributeId: attributeId,
      })),
      skipDuplicates: true,
    })
  }

  detail(
    id: string,
    options?: { code?: string; include?: Partial<Record<"groups" | "options", boolean>> }
  ) {
    return prisma.productAttribute.findFirst({
      where: { OR: compact([{ id: id }, options?.code ? { code: options?.code } : null]) },
      include: {
        groups: options?.include?.groups,
        options: options?.include?.options,
      },
    })
  }

  create(input: AttributeCreateInputSchema) {
    return prisma.productAttribute.create({
      data: {
        name: input.name,
        code: input.code,
        options: {
          createMany: {
            data: input.options.map((option) => ({
              code: option?.code as string,
              name: option?.name as string,
            })),
          },
        },
        sortOrder: input.sortOrder,
        isFilterable: input.isFilterable,
        isRequired: input.isRequired,
        isShowToCustomer: input.isShowToCustomer,
      },
    })
  }

  async deleteProductVariantsBelongsToAttributeOption(attributeOptionOrAttributeIds: string[]) {
    // Delete many product variant belongs to that attribute
    const getDeleteVariantAttributeIds = await prisma.productVariantAttribute.findMany({
      where: {
        OR: [
          {
            productAttributeOptionId: {
              in: attributeOptionOrAttributeIds,
            },
          },
          {
            productAttributeId: {
              in: attributeOptionOrAttributeIds,
            },
          },
        ],
      },
      select: { id: true },
    })

    const getDeletesProductVariantBelongsToAttributeId = await prisma.productVariant.findMany({
      where: {
        attributes: {
          some: {
            id: { in: getDeleteVariantAttributeIds.map(({ id }) => id) },
          },
        },
      },
      select: { id: true },
    })

    const getDeletesProductVariantIds = getDeletesProductVariantBelongsToAttributeId.map(
      ({ id }) => id
    )

    await prisma.productVariantAttribute.deleteMany({
      where: {
        productVariantId: {
          in: getDeletesProductVariantIds,
        },
      },
    })

    return prisma.productVariant.deleteMany({
      where: {
        id: { in: getDeletesProductVariantIds },
      },
    })
  }

  async updateAttributeOptions(
    attributeId: string,
    currentOptions: ProductAttributeOption[],
    input: Pick<AttributeUpdateInputSchema, "options">
  ) {
    const inputOptions = input.options

    const {
      creates: attributeOptionCreates,
      updates: attributeOptionUpdates,
      deletes: attributeOptionDeletes,
    } = getAttributeOptionsChangesFromAttribute(attributeId, currentOptions, inputOptions)

    const getIdsAttributeOptionDeletes = Object.keys(attributeOptionDeletes)
    await this.deleteProductVariantsBelongsToAttributeOption(getIdsAttributeOptionDeletes)

    await prisma.$transaction([
      this.createOptions(attributeOptionCreates),
      this.deleteOptions(Object.keys(attributeOptionDeletes)),
      ...attributeOptionUpdates.map((option) => this.updateOptions(option)),
    ])
  }

  update(attributeId: string, input: Omit<AttributeUpdateInputSchema, "options">) {
    return prisma.productAttribute.update({
      where: { id: attributeId },
      data: {
        name: input.name,
        code: input.code,
        sortOrder: 1,
        isFilterable: input.isFilterable,
        isRequired: input.isRequired,
        isShowToCustomer: input.isShowToCustomer,
      },
    })
  }

  delete(attributeIds: string[]) {
    return prisma.productAttribute.deleteMany({ where: { id: { in: attributeIds } } })
  }
}

const attributeService = new AttributeService()

export default attributeService
