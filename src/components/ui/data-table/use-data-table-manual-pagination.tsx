import { useState } from "react"

export interface ManualPaginationState {
  page: number
  pageSize: number
}

export const useDataTableManualOffsetPagination = (
  defaultStates?: Partial<ManualPaginationState>
) => {
  const [page, setPage] = useState<number>(defaultStates?.page || 0)
  const [pageSize, setPageSize] = useState<number>(defaultStates?.pageSize || 0)

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
  }
}
