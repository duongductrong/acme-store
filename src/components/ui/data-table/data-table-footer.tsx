import { Table } from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { forwardRef, useId } from "react"
import { Button } from "../button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select"
import { DataTablePagination } from "./data-table"

export interface DataTableFooterProps {
  table: Table<any>

  pageSize: number
  pageSizes: number[]

  pagination?: DataTablePagination

  canPreviousPage?: boolean | null
  canNextPage?: boolean | null

  onNextPage: () => void
  onPreviousPage: () => void
  onGotoFirstPage: () => void
  onGotoLatestPage: () => void
  onGotoPage: (value: number) => void
  onPageSizeChange: (value: number) => void
}

const DataTableFooter = forwardRef<HTMLDivElement, DataTableFooterProps>(
  (
    {
      table,
      pageSize,
      pageSizes,
      pagination,
      canNextPage,
      canPreviousPage,
      onGotoPage,
      onNextPage,
      onPreviousPage,
      onGotoFirstPage,
      onGotoLatestPage,
      onPageSizeChange,
    },
    ref
  ) => {
    const cid = useId()

    return (
      <div ref={ref} className="data-table__footer flex items-center justify-end gap-4 py-4 mt-auto">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm">Rows per page</p>
          <Select
            defaultValue={pageSize.toString()}
            onValueChange={(val) => onPageSizeChange(Number(val))}
          >
            <SelectTrigger className="w-[70px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizes?.map((_pageSize) => (
                <SelectItem key={`${cid}dt-rpp-${_pageSize}`} value={_pageSize.toString()}>
                  {_pageSize}
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
            size="icon"
            onClick={onGotoFirstPage}
            disabled={!canPreviousPage}
          >
            <ChevronsLeft className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onPreviousPage}
            disabled={!canPreviousPage}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onNextPage}
            disabled={!canNextPage}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={onGotoLatestPage}
            disabled={!canNextPage}
          >
            <ChevronsRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }
)

DataTableFooter.displayName = "DataTableFooter"

export default DataTableFooter
