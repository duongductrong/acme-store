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
  LucideIcon,
  PackageSearch,
  Plus,
} from "lucide-react"
import Spin from "../loadings/spin"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select"
import { getCanNextPageBasedType, getCanPreviousPageBasedType } from "./utils"
import { cn } from "@/lib/utils"

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
  data: TData[]
  columns: ColumnDef<TData, TValue>[]

  searchable?: boolean
  searchPlaceholder?: string

  rows?: number[]

  emptyIcon?: LucideIcon
  emptyContent?: string

  createNewEntryText?: string

  pagination?: DataTablePagination

  defaultRowSelection?: { [k: string]: any }
  defaultColumnVisibility?: VisibilityState

  loading?: boolean
  enableCreateNewEntry?: boolean
  enableEmpty?: boolean
  enableRowSelection?: boolean
  enableRowSelectionStyle?: boolean
  enableHiding?: boolean

  className?: string

  onCreateNewEntry?: () => void
  onRowSelection?: (data: { [k: string]: any }) => void
  onRowClicked?: (data: Row<any>) => void
}

export const DataTable = ({
  data,
  columns,
  loading,
  className,
  searchable,
  pagination,
  searchPlaceholder,
  defaultRowSelection,
  defaultColumnVisibility,
  rows = [10, 20, 30, 50, 100],
  emptyIcon: EmptyIcon = PackageSearch,
  emptyContent = "No results found.",
  createNewEntryText = "Create new entry",

  enableEmpty = true,
  enableRowSelection = false,
  enableRowSelectionStyle = false,
  enableCreateNewEntry = true,
  enableHiding = true,

  onCreateNewEntry,
  onRowSelection,
  onRowClicked,
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
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>(
    defaultColumnVisibility ?? {}
  )
  const [rowSelection, setRowSelection] = React.useState(defaultRowSelection)

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

  const ROW_SELECTION_DATA = {
    columns: {
      accessorKey: `select-${cid}`,
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
        sorting,
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
    enableRowSelection,

    onSortingChange: setSorting,
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

  return (
    <div className={cn("w-full", className)}>
      {searchable && (
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
      )}
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
                        : flexRender(header.column.columnDef.header, header.getContext())}
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
                  enableSelectedStyle={enableRowSelectionStyle}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClicked && onRowClicked(row)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
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
                  <Spin className="w-5 h-5 mx-auto" />
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
          Page {1} of {5}
        </p>
        <div className="space-x-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleGotoFirstPage}
            disabled={!getCanPreviousPage}
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handlePreviousPage}
            disabled={!getCanPreviousPage}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleNextPage}
            disabled={!getCanNextPage}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            type="button"
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
