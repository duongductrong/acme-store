import dynamic from "next/dynamic"
import DataTableSkeleton from "./data-table-skeleton"

export * from "./use-data-table-utils"
export * from "./utils"

export * from "./data-table"

export const SuspenseDataTable = dynamic(
  () => import("@/components/ui/data-table/data-table").then((r) => ({ default: r.DataTable })),
  {
    ssr: false,
    loading: () => <DataTableSkeleton />,
  }
)
