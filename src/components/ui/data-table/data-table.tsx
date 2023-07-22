/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {
  ColumnDef,
  ColumnFiltersState,
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
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { safeParseNumber } from "@/lib/number"
import { isNil, omitBy } from "lodash"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Loader,
  LucideIcon,
  PackageSearch,
  Plus,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select"
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

export interface DataTableProps<TData = any, TValue = any> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]

  searchable?: boolean
  searchPlaceholder?: string

  rows?: number[]
  loading?: boolean

  onCreateNewEntry?: () => void
  createNewEntryEnable?: boolean
  createNewEntryText?: string
  emptyContent?: string
  emptyIcon?: LucideIcon
  emptyEnable?: boolean
  pagination?: DataTablePagination
}

export const DataTable = ({
  data,
  columns,
  loading,
  searchable,
  pagination,
  searchPlaceholder,
  emptyEnable = true,
  rows = [10, 20, 30, 50, 100],
  emptyContent = "No results found.",
  emptyIcon: EmptyIcon = PackageSearch,
  createNewEntryEnable = true,
  createNewEntryText = "Create new entry",
  onCreateNewEntry,
}: DataTableProps) => {
  const isManualPaginationOrSorting =
    !!pagination?.type && pagination.type !== "self"
  const isOffsetPagination = pagination?.type === "offset"
  const isCursorPagination = pagination?.type === "cursor-based"

  if (isCursorPagination)
    throw new Error("Not implemented 'cursor' pagination yet.")

  const cid = React.useId()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

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

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: isManualPaginationOrSorting
      ? undefined
      : getSortedRowModel(),
    getPaginationRowModel: isManualPaginationOrSorting
      ? undefined
      : getPaginationRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: omitBy(
      {
        sorting,
        columnFilters,
        columnVisibility,
        rowSelection,
        pagination: isManualPaginationOrSorting
          ? {
              pageIndex: Number(manualOffsetPagination?.page) - 1,
              pageSize: Number(manualOffsetPagination?.pageSize),
            }
          : undefined,
      },
      isNil
    ),

    manualPagination: isManualPaginationOrSorting,
    manualSorting: isManualPaginationOrSorting,
  })

  const pageCount =
    pagination?.type === "offset"
      ? Math.ceil(
          safeParseNumber(pagination.totalRecords, 1) /
            safeParseNumber(pagination.pageSize, 0)
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

    console.log("next page")
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
    pagination?.type === "self" || !pagination?.type
      ? [pagination?.page, pagination?.pageSize]
      : []
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

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {searchable ? (
          <Input
            placeholder={searchPlaceholder}
            // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            // onChange={(event) =>
            //   table.getColumn("name")?.setFilterValue(event.target.value)
            // }
            className="max-w-sm"
          />
        ) : null}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="relative">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : emptyEnable ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center py-10"
                >
                  {loading ? null : (
                    <>
                      <EmptyIcon className="w-10 h-10 block text-center mx-auto mb-4" />
                      <p className="font-semibold mb-4">{emptyContent}</p>
                      {createNewEntryEnable ? (
                        <Button
                          size="sm"
                          className="text-xs"
                          onClick={onCreateNewEntry}
                        >
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
              <TableRow className="absolute top-0 left-0 w-full h-full bg-neutral-100/50 dark:bg-neutral-900/50">
                <TableCell
                  colSpan={999}
                  className="h-full w-full flex items-center justify-center"
                >
                  <Loader className="w-5 h-5 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end gap-4 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm">Rows per page</p>
          <Select
            defaultValue={rows[0].toString()}
            onValueChange={handleRowsPerPageChange}
          >
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
          Page {1} of {5}
        </p>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleGotoFirstPage}
            disabled={!getCanPreviousPage}
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePreviousPage}
            disabled={!getCanPreviousPage}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={!getCanNextPage}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleGotoLatestPage}
            disabled={!getCanNextPage}
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
