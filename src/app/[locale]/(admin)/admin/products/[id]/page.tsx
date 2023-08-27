"use client"

import { useToast } from "@/components/ui/use-toast"
import { ADMIN_URL } from "@/constant/urls"
import trpc from "@/lib/trpc-client"
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

  const { data: product, isLoading } = trpc.product.detail.useQuery({
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

      trpcUtils.attributeGroup.detail.invalidate()
      trpcUtils.attributeGroup.invalidate()
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

  const defaultValues = {
    ...product,
    variants: product.variants.map((pVariant) => {
      const _attributes = pVariant.attributes
        .map((pVariantAttribute) => pVariantAttribute.productAttributeOption)
        .flat(1)

      return { ...pVariant, attributes: _attributes }
    }),
  } as unknown as ProductSchemaType

  return (
    <ProductForm
      title="Edit a product"
      defaultValues={defaultValues}
      loading={isLoading}
      onSubmit={(data) => {
        updateProduct(data as Required<ProductSchemaType>)
      }}
      error={error}
    />
  )
}

export default EditProduct
