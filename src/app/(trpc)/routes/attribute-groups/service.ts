import prisma from "@/lib/prisma"
import { AttributeGroupCreateInputSchema } from "./input"

class AttributeGroupService {
  create(input: AttributeGroupCreateInputSchema, groupIds: string[], attributeId: string) {
    return prisma.productAttributesOnGroups.createMany({
      data: groupIds?.map((attrGroupId) => ({
        productAttributeGroupId: attrGroupId as string,
        productAttributeId: attributeId,
      })),
      skipDuplicates: true,
    })
  }
}

export const attributeGroupService = new AttributeGroupService()

export default attributeGroupService
