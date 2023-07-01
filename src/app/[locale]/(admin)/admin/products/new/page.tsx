"use client"

import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
import { useRouter } from "next/navigation"
import ProductForm from "../templates/product-form"

export interface NewProductProps {}

const NewProduct = (props: NewProductProps) => {
  const router = useRouter()
  const t = useToast()

  const { mutate: productMutate } = trpc.product.create.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Created new product successfully",
      })

      router.push(ADMIN_URL.PRODUCT.LIST)
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when creating new product",
        variant: "destructive",
      })
    },
  })

  return (
    <ProductForm
      title="Create a product"
      onSubmit={(values) => productMutate(values)}
    />
  )
}

export default NewProduct
