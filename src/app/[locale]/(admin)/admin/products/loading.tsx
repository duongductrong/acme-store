import SectionView from "@/components/sections/section-view"
import React from "react"

export interface ProductListSkeletonProps {}

const ProductListSkeleton = (props: ProductListSkeletonProps) => {
  return <SectionView title="_" skeleton />
}

export default ProductListSkeleton
