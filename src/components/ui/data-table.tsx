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
import { Loader, LucideIcon, PackageSearch, Plus } from "lucide-react"

export interface DataTableProps<TData = any, TValue = any> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]

  searchable?: boolean
  searchPlaceholder?: string

  loading?: boolean

  onCreateNewEntry?: () => void
  createNewEntryEnable?: boolean
  createNewEntryText?: string
  emptyContent?: string
  emptyIcon?: LucideIcon
  emptyEnable?: boolean
}

export const DataTable = ({
  data,
  columns,
  loading,
  searchable,
  searchPlaceholder,
  emptyEnable = true,
  emptyContent = "No results found.",
  emptyIcon: EmptyIcon = PackageSearch,
  createNewEntryEnable = true,
  createNewEntryText = "Create new entry",
  onCreateNewEntry,
}: DataTableProps) => {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        {searchable ? (
          <Input
            placeholder={searchPlaceholder}
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
