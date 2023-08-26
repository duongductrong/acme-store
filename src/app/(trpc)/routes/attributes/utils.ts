import { AttributeSchemaType } from "@/schemas/attribute"
import { ProductAttributeOption } from "@prisma/client"

export const getAttributeOptionsChangesFromAttribute = (
  attributeId: string,
  currentOptions: ProductAttributeOption[],
  inputOptions: AttributeSchemaType["options"]
) => {
  const deleteAttributeOptIds = currentOptions.reduce(
    (totalIds, { id }) => ({ ...totalIds, [id]: true }),
    {} as Record<string, boolean>
  )

  const attrOptionsUpdateOrCreatesOrDeletes = inputOptions.reduce(
    (group, option) => {
      if (option?.id || option?.attributeId) {
        group.updates.push({
          id: option.id as string,
          code: option?.code as string,
          name: option?.name as string,
        })

        delete group.deletes?.[option?.id as string]
      } else {
        group.creates.push({
          code: option?.code as string,
          name: option?.name as string,
          attributeId,
        })

        delete group.deletes?.[option?.id as string]
      }

      return group
    },
    { creates: [], updates: [], deletes: deleteAttributeOptIds } as {
      creates: Omit<ProductAttributeOption, "id">[]
      updates: Omit<ProductAttributeOption, "attributeId">[]
      deletes: Record<string, boolean>
    }
  )

  // Update product attribute options (creates or updates)
  // const {
  //   creates: attributeOptionCreates,
  //   updates: attributeOptionUpdates,
  //   deletes: attributeOptionDeletes,
  // } = attrOptionsUpdateOrCreatesOrDeletes

  return attrOptionsUpdateOrCreatesOrDeletes
}
