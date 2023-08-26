import { FormField } from "@/components/ui/form"
import trpc from "@/lib/trpc-client"

export interface ProductCollectionFieldProps {}

const ProductCollectionField = (props: ProductCollectionFieldProps) => {
  return (
    <FormField
      name="collectionId"
      variant="SELECT_INFINITE"
      label="Collection"
      wrapperClassName="col-span-4"
      placeholder="Select collections"
      useInfiniteQuery={trpc.collection.list.useInfiniteQuery}
      mapLabelBy={"name"}
      mapValueBy={"id"}
      isMulti={true}
    />
  )
}

export default ProductCollectionField
