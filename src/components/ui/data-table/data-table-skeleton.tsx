import { Skeleton } from "../skeleton"

export interface DataTableSkeletonProps {}

const DataTableSkeleton = (props: DataTableSkeletonProps) => (
  <div className="grid grid-cols-4 gap-4 p-4 h-full">
    <Skeleton className="w-full col-span-4" />

    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />

    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />

    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />

    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />

    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />

    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />
    <Skeleton className="w-full" />

    <Skeleton className="w-full col-span-4 h-[50px]" />
  </div>
)

export default DataTableSkeleton
