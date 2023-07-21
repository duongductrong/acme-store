import { ComboboxOption } from "@/components/ui/combobox"
import { FormField } from "@/components/ui/form"
import trpc from "@/lib/trpc-client"

export interface ProductAttributeGroupProps {}

const ProductAttributeGroup = (props: ProductAttributeGroupProps) => {
  const { data: attributeGroups } = trpc.attributeGroup.list.useQuery()

  const transformOpts =
    attributeGroups?.map<ComboboxOption>((attrGroup) => ({
      label: attrGroup.name,
      value: attrGroup.id,
    })) ?? []

  return (
    <FormField
      variant="SELECT"
      label="By group"
      name="attributeGroupId"
      placeholder="Select group"
      options={transformOpts}
    />
  )
}

export default ProductAttributeGroup
