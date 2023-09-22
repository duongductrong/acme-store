/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */

"use client"

import {
  CellContext,
  ColumnDef,
  ColumnFiltersState,
  HeaderContext,
  PaginationState,
  Row,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { TableCell, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { safeParseNumber } from "@/lib/number"
import { isNil, omitBy } from "lodash"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FolderSearch,
  Loader2,
  LucideIcon,
  Plus,
} from "lucide-react"
import { useIntersection } from "react-use"
import { VList } from "virtua"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select"
import DataTableHeader from "./data-table-header"
import DataTableProvider from "./data-table-provider"
import { DataTableRowViewport } from "./data-table-row-viewport"
import { getCanNextPageBasedType, getCanPreviousPageBasedType } from "./utils"

export interface DataTableOffsetPagination {
  type: "offset"
  page: number
  pageSize: number
  totalRecords: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  setPageSize: React.Dispatch<React.SetStateAction<number>>
}

export interface DataTableCursorBasedPagination {
  type: "cursor-based"
}

export interface DataTableSelfPagination {
  type?: "self"
  page: number
  pageSize: number
}

export type DataTablePagination =
  | DataTableCursorBasedPagination
  | DataTableOffsetPagination
  | DataTableSelfPagination

export type DataTableProps<TData = any, TValue = any> = {
  data: TData[]
  rows?: number[]
  columns: ColumnDef<TData, TValue>[]

  loading?: boolean

  emptyIcon?: LucideIcon
  emptyContent?: string

  createNewEntryText?: string

  sorting?: SortingState
  pagination?: DataTablePagination

  defaultRowSelection?: { [k: string]: any }
  defaultColumnVisibility?: VisibilityState

  enableCreateNewEntry?: boolean
  enableEmpty?: boolean
  enableRowSelection?: boolean
  enableRowSelectionStyle?: boolean
  enableHiding?: boolean
  enableSorting?: boolean

  noBordered?: boolean

  className?: string
  classNames?: {
    tableContainerClassName?: string
    tableClassName?: string

    tableHeaderClassName?: string
    tableHeaderTrClassName?: string
    tableHeaderThClassName?: string

    tableBodyClassName?: string
    tableBodyTrClassName?: string
    tableBodyTdClassName?: string
  }

  onCreateNewEntry?: () => void
  onRowSelection?: (data: { [k: string]: any }) => void
  onRowClicked?: (data: Row<any>) => void

  setSorting?: React.Dispatch<React.SetStateAction<SortingState>>
}

export const DataTable = ({
  data,
  columns,
  sorting,
  loading,
  className,
  classNames,
  pagination,
  defaultRowSelection,
  defaultColumnVisibility,
  rows = [10, 20, 30, 50, 100],
  emptyIcon: EmptyIcon = FolderSearch,
  emptyContent = "No results found.",
  createNewEntryText = "Create new entry",

  enableEmpty = true,
  enableSorting = true,
  enableRowSelection = false,
  enableRowSelectionStyle = false,
  enableCreateNewEntry = true,
  enableHiding = true,

  noBordered = false,

  onCreateNewEntry,
  onRowSelection,
  onRowClicked,
  setSorting,
}: DataTableProps) => {
  const isManualPaginationOrSorting = !!pagination?.type && pagination.type !== "self"
  const isOffsetPagination = pagination?.type === "offset"
  const isCursorPagination = pagination?.type === "cursor-based"

  if (isCursorPagination) throw new Error("Not implemented 'cursor' pagination yet.")

  const cid = React.useId()
  const [selfPagination, setSelfPagination] = React.useState<PaginationState>({
    pageIndex: Number(pagination?.page || 1) - 1,
    pageSize: Number(pagination?.pageSize || 0),
  })
  const [selfSorting, setSelfSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    defaultColumnVisibility ?? {}
  )
  const [rowSelection, setRowSelection] = React.useState(defaultRowSelection)

  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const manualOffsetPagination =
    pagination?.type === "offset"
      ? {
          page: pagination.page,
          pageSize: pagination.pageSize,
          totalRecords: pagination.totalRecords,
        }
      : undefined

  const manualSelfPagination =
    !pagination?.type || pagination?.type === "self"
      ? {
          page: pagination?.page,
          pageSize: pagination?.pageSize,
        }
      : undefined

  const ROW_SELECTION_DATA: { columns: ColumnDef<any> } = {
    columns: {
      accessorKey: `select-${cid}`,
      maxSize: 50,
      header: ({ table }: HeaderContext<unknown, any>) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }: CellContext<unknown, any>) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    },
  }

  const columnDefReactTable = enableRowSelection
    ? [ROW_SELECTION_DATA.columns, ...columns]
    : columns

  const _getPaginationRowModel = isManualPaginationOrSorting ? undefined : getPaginationRowModel
  const _getSortedRowModel = isManualPaginationOrSorting ? undefined : getSortedRowModel

  const table = useReactTable({
    data,
    columns: columnDefReactTable,

    state: omitBy(
      {
        sorting: isCursorPagination || isOffsetPagination ? sorting : selfSorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        pagination: isManualPaginationOrSorting
          ? {
              pageIndex: Number(manualOffsetPagination?.page) - 1,
              pageSize: Number(manualOffsetPagination?.pageSize),
            }
          : pagination?.type === "self"
          ? selfPagination
          : undefined,
      },
      isNil
    ),

    manualPagination: isManualPaginationOrSorting,
    manualSorting: isManualPaginationOrSorting,

    enableHiding,
    enableSorting,
    enableRowSelection,

    onSortingChange: isOffsetPagination || isCursorPagination ? setSorting : setSelfSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setSelfPagination,

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: _getSortedRowModel?.(),
    getPaginationRowModel: _getPaginationRowModel?.(),

    debugTable: true,
  })

  const pageCount =
    pagination?.type === "offset"
      ? Math.ceil(
          safeParseNumber(pagination.totalRecords, 1) / safeParseNumber(pagination.pageSize, 0)
        )
      : -1

  const getCanNextPage = isManualPaginationOrSorting
    ? getCanNextPageBasedType(pagination, pageCount)
    : table.getCanNextPage()
  const getCanPreviousPage = isManualPaginationOrSorting
    ? getCanPreviousPageBasedType(pagination)
    : table.getCanPreviousPage()

  const handleGotoFirstPage = () => {
    if (isManualPaginationOrSorting) {
      if (isOffsetPagination) {
        pagination.setPage(1)
      }
      return
    }

    table.setPageIndex(0)
  }

  const handleGotoLatestPage = () => {
    if (isManualPaginationOrSorting) {
      if (isOffsetPagination) {
        pagination.setPage(pageCount)
      }
      return
    }

    table.setPageIndex(table.getPageCount() - 1)
  }

  const handleNextPage = () => {
    if (isManualPaginationOrSorting) {
      if (isOffsetPagination) {
        pagination.setPage(pagination.page + 1)
      }
      return
    }

    table.nextPage()
  }

  const handlePreviousPage = () => {
    if (isManualPaginationOrSorting) {
      if (isOffsetPagination) {
        pagination.setPage(pagination.page - 1)
      }
      return
    }

    table.previousPage()
  }

  const handleRowsPerPageChange = (val: string) => {
    if (isManualPaginationOrSorting) {
      if (isOffsetPagination) {
        pagination.setPageSize(safeParseNumber(val, 10))
      }

      return
    }

    table.setPageSize(safeParseNumber(val, 10))
  }

  const selfPaginationDependencies =
    pagination?.type === "self" || !pagination?.type ? [pagination?.page, pagination?.pageSize] : []
  React.useEffect(() => {
    if (manualSelfPagination) {
      if (manualSelfPagination.page) {
        table.setPageIndex(manualSelfPagination.page - 1)
      }

      if (manualSelfPagination?.pageSize) {
        table.setPageSize(manualSelfPagination.pageSize)
      }
    }
  }, selfPaginationDependencies)

  React.useEffect(() => {
    if (onRowSelection) {
      onRowSelection(rowSelection ?? {})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(Object.keys(rowSelection ?? {}))])

  React.useEffect(() => {
    setRowSelection(defaultRowSelection)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(Object.keys(defaultRowSelection ?? {}))])

  const wrapperIntersection = useIntersection(wrapperRef, { threshold: 1 })
  const wrapperRect = wrapperIntersection?.boundingClientRect
  const tableBodyVListSize = safeParseNumber(wrapperRect?.height, 1) - 48 - 68

  return (
    <DataTableProvider>
      <div ref={wrapperRef} className={cn("flex flex-col w-full h-full min-h-[500px]", className)}>
        <div className="rounded-md border border-muted overflow-hidden">
          <DataTableHeader
            table={table}
            classNames={classNames}
            noBordered={noBordered}
            enableSorting={enableSorting}
            enableRowSelection={enableRowSelection}
          />

          <div className={cn(classNames?.tableBodyClassName)}>
            {table.getRowModel().rows?.length ? (
              <VList
                components={{
                  Item: "div",
                  Root: DataTableRowViewport,
                }}
                style={{ height: tableBodyVListSize }}
              >
                {table.getRowModel().rows.map((row) => {
                  let cellStickyOffset = 0
                  return (
                    <TableRow
                      key={row.id}
                      enableSelectedStyle={enableRowSelectionStyle}
                      data-state={row.getIsSelected() && "selected"}
                      className={cn("table-fixed table w-full", classNames?.tableBodyTrClassName)}
                      onClick={() => onRowClicked && onRowClicked(row)}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const cellColumnDef = cell.column.columnDef as ColumnDef<any>
                        const cellSize =
                          Number(cellColumnDef.size) > Number(cellColumnDef.maxSize)
                            ? cellColumnDef.maxSize
                            : cellColumnDef.size

                        const isCellEnableSticky = cellColumnDef.enableSticky

                        const cellCssWidth = Number(cellSize)
                        const cellCssOffsetLeft = cellStickyOffset

                        if (cellColumnDef.enableSticky) {
                          cellStickyOffset += cellCssWidth
                        }

                        return (
                          <TableCell
                            key={cell.id}
                            style={{ width: cellCssWidth, left: cellCssOffsetLeft }}
                            className={cn(
                              [isCellEnableSticky ? "sticky" : ""],
                              classNames?.tableBodyTdClassName
                            )}
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </VList>
            ) : enableEmpty ? (
              <TableRow>
                <TableCell colSpan={columns.length + 999} className="h-24 text-center py-10">
                  {loading ? null : (
                    <>
                      <EmptyIcon className="w-10 h-10 block text-center mx-auto mb-4 text-muted-foreground" />
                      <p className="font-medium text-muted-foreground mb-4">{emptyContent}</p>
                      {enableCreateNewEntry ? (
                        <Button size="sm" className="text-xs" onClick={onCreateNewEntry}>
                          <Plus className="w-4 h-4 mr-2" />
                          {createNewEntryText}
                        </Button>
                      ) : null}
                    </>
                  )}
                </TableCell>
              </TableRow>
            ) : null}

            {loading && (
              <TableRow className="absolute top-0 left-0 w-full h-full bg-zinc-100/50 dark:bg-zinc-900/50">
                <TableCell colSpan={999} className="h-full w-full flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mx-auto" />
                </TableCell>
              </TableRow>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 py-4 mt-auto p-3">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="flex items-center gap-2">
            <p className="text-sm">Rows per page</p>
            <Select defaultValue={rows[0].toString()} onValueChange={handleRowsPerPageChange}>
              <SelectTrigger className="w-[70px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {rows?.map((row) => (
                  <SelectItem key={`${cid}dt-rpp-${row}`} value={row.toString()}>
                    {row}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm mx-6">
            Page{" "}
            {pagination?.type === "offset"
              ? pagination.page
              : table.getState().pagination.pageIndex + 1}{" "}
            of{" "}
            {pagination?.type === "offset"
              ? Math.ceil(pagination.totalRecords / pagination.pageSize)
              : table.getPageCount()}
          </p>
          <div className="space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGotoFirstPage}
              disabled={!getCanPreviousPage}
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={!getCanPreviousPage}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={!getCanNextPage}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleGotoLatestPage}
              disabled={!getCanNextPage}
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </DataTableProvider>
  )
}
