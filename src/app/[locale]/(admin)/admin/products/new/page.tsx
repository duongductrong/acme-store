"use client"

import trpc from "@/lib/trpc-client"
import ProductForm from "../components/product-form"

export interface NewProductProps {}

const NewProduct = (props: NewProductProps) => {
  const { mutate: productMutate } = trpc.product.create.useMutation()

  return <ProductForm onSubmit={(values) => productMutate(values)} />
}

export default NewProduct
