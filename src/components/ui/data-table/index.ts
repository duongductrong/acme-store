import dynamic from "next/dynamic"

export * from "./use-data-table-utils"
export * from "./utils"

export * from "./data-table"

export const SuspenseDataTable = dynamic(
  () => import("@/components/ui/data-table/data-table").then((r) => ({ default: r.DataTable })),
  {
    ssr: false,
  }
)
