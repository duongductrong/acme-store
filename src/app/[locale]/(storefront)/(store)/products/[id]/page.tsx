"use client"

import { cn } from "@/lib/utils"
import ProductContent from "./_components/product-content"
import ProductMedia from "./_components/product-media"

export interface ProductDetailProps {}

const ProductDetail = (props: ProductDetailProps) => {
  return (
    <div
      className={cn(
        "p-12",
        "min-h-[85vh]",
        "bg-black rounded-lg border border-secondary",
        "grid grid-cols-12 gap-base"
      )}
    >
      <ProductMedia />
      <ProductContent />
    </div>
  )
}

export default ProductDetail
