"use client"

import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc/trpc-client"
import { ProductSchemaType } from "@/schemas/product"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import ProductForm from "../_components/product-form"

export interface EditProductProps {
  params: { id: string }
}

const EditProduct = ({ params: { id } }: EditProductProps) => {
  const router = useRouter()
  const t = useToast()
  const trpcUtils = trpc.useContext()

  const { data: product } = trpc.product.detail.useQuery({
    id: id,
    includes: {
      metadata: true,
    },
  })

  const { mutate: updateProduct, error } = trpc.product.update.useMutation({
    onSuccess() {
      t.toast({
        title: "Success",
        description: "Updated a product successfully",
      })

      router.push(ADMIN_URL.PRODUCT.LIST)

      // Invalidate queries
      trpcUtils.product.list.invalidate()
      trpcUtils.product.detail.invalidate()
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

  return (
    <ProductForm
      title="Edit a product"
      defaultValues={product as any as ProductSchemaType}
      onSubmit={(data) => updateProduct(data as Required<ProductSchemaType>)}
      error={error}
    />
  )
}

export default EditProduct
