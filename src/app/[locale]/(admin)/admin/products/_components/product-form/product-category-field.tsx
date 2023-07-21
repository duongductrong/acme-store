import FormField from "@/components/ui/form/form-field"
import trpc from "@/lib/trpc-client"

export interface ProductCategoryFieldProps {}

const ProductCategoryField = (props: ProductCategoryFieldProps) => {
  return (
    <FormField
      label="Category"
      name="categoryId"
      variant="SELECT_INFINITE"
      wrapperClassName="col-span-2"
      placeholder="Category"
      useInfiniteQuery={trpc.category.list.useInfiniteQuery}
      isMulti={false}
      mapLabelBy="name"
      mapValueBy="id"
    />
  )
}

export default ProductCategoryField
