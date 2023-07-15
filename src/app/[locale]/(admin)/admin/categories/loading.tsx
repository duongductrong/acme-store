import SectionView from "@/components/sections/section-view"
import React from "react"

export interface CategoryListSkeletonProps {}

const CategoryListSkeleton = (props: CategoryListSkeletonProps) => {
  return <SectionView title="_" skeleton />
}

export default CategoryListSkeleton
