"use client"

import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { useRouter } from "next/navigation"
import ProductForm from "../_components/product-form"

export interface NewProductProps {}

const NewProduct = (props: NewProductProps) => {
  const router = useRouter()
  const t = useToast()
  const trpcUtils = trpc.useContext()

  const {
    mutate: createProduct,
    isLoading,
    error,
  } = trpc.product.create.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Created new product successfully",
      })

      router.push(ADMIN_URL.PRODUCT.LIST)

      // Invalidate queries
      trpcUtils.product.list.invalidate()
      trpcUtils.attributeGroup.detail.invalidate()
    },
  })

  return (
    <ProductForm
      title="Create a product"
      loading={isLoading}
      onSubmit={(values) => createProduct(values)}
      error={error}
    />
  )
}

export default NewProduct
