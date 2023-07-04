import { ComboboxOption } from "@/components/ui/combobox"
import FormUnified from "@/components/ui/form/form-unified"
import trpc from "@/lib/trpc/trpc-client"

export interface ProductCategoryFieldProps {}

const ProductCategoryField = (props: ProductCategoryFieldProps) => {
  const { data: categories = [] } = trpc.category.list.useQuery()

  const options = categories?.map<ComboboxOption>((category) => ({
    label: category.name,
    value: category.id,
  }))

  return (
    <FormUnified
      label="Category"
      name="categoryId"
      variant="SELECT"
      wrapperClassName="col-span-4"
      placeholder="Category"
      selectProps={{ options: options, isMulti: false }}
    />
  )
}

export default ProductCategoryField
