"use client"
import { SortingState } from "@tanstack/react-table"
import { useState } from "react"

export interface ManualPaginationState {
  page: number
  pageSize: number
}

export interface ManualSortingState {
  sorting: SortingState
}

export const useDataTableUtils = (
  defaultStates?: Partial<ManualPaginationState> & Partial<ManualSortingState>
) => {
  const [page, setPage] = useState<number>(defaultStates?.page || 0)
  const [pageSize, setPageSize] = useState<number>(defaultStates?.pageSize || 0)
  const [sorting, setSorting] = useState<SortingState>([])

  return {
    page,
    sorting,
    pageSize,
    setPage,
    setPageSize,
    setSorting,
  }
}
