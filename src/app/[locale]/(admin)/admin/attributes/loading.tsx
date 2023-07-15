import SectionView from "@/components/sections/section-view"
import React from "react"

export interface AttributeListSkeletonProps {}

const AttributeListSkeleton = (props: AttributeListSkeletonProps) => {
  return <SectionView title="_" skeleton />
}

export default AttributeListSkeleton
