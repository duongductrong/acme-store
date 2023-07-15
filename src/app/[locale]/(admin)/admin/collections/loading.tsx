import SectionView from "@/components/sections/section-view"
import React from "react"

export interface CollectionListSkeletonProps {}

const CollectionListSkeleton = (props: CollectionListSkeletonProps) => {
  return <SectionView title="_" skeleton />
}

export default CollectionListSkeleton
