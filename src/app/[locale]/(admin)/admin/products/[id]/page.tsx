"use client"

import trpc from "@/lib/trpc-client"
import { ProductSchemaType } from "@/schemas/product"
import { Loader2 } from "lucide-react"
import ProductForm from "../components/product-form"

export interface EditProductProps {
  params: { id: string }
}

const EditProduct = ({ params: { id } }: EditProductProps) => {
  const { data: product, error } = trpc.product.detail.useQuery(id)
  const { mutate } = trpc.product.update.useMutation()

  if (!product) return <Loader2 className="w-4 h-4 animate-spin" />
  if (error) return "Error"

  return (
    <ProductForm
      defaultValues={product as any as ProductSchemaType}
      onSubmit={(data) => mutate(data)}
    />
  )
}

export default EditProduct
