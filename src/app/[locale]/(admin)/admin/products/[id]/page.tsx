"use client"

import { useToast } from "@/components/ui/use-toast"
import trpc from "@/lib/trpc-client"
import { ProductSchemaType } from "@/schemas/product"
import { Loader2 } from "lucide-react"
import ProductForm from "../templates/product-form"
import { useRouter } from "next/navigation"
import { ADMIN_URL } from "@/constant/urls"

export interface EditProductProps {
  params: { id: string }
}

const EditProduct = ({ params: { id } }: EditProductProps) => {
  const router = useRouter()
  const t = useToast()
  const { data: product, error } = trpc.product.detail.useQuery(id)
  const { mutate } = trpc.product.update.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Updated a product successfully",
      })

      router.push(ADMIN_URL.PRODUCT.LIST)
    },
    onError() {
      t.toast({
        title: "Error",
        description: "Has an error when updating a product",
        variant: "destructive",
      })
    },
  })

  if (!product) return <Loader2 className="w-4 h-4 animate-spin" />
  if (error) return "Error"

  console.log(product)

  return (
    <ProductForm
      title="Edit a product"
      defaultValues={product as any as ProductSchemaType}
      onSubmit={(data) => mutate(data)}
    />
  )
}

export default EditProduct
