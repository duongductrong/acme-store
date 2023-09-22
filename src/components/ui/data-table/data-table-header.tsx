import { cn } from "@/lib/utils"
import {
  ColumnDef,
  SortDirection,
  Table as TanStackTablePrimitive,
  flexRender,
} from "@tanstack/react-table"
import { ChevronsUpDown, LucideIcon, SortAsc, SortDesc } from "lucide-react"
import { DataTableProps } from "."
import { Table, TableHead, TableHeader, TableRow } from "../table"
import { useBaseDataTable } from "./use-base-data-table"

const SortIcons: Record<SortDirection, LucideIcon> = {
  asc: SortAsc,
  desc: SortDesc,
}

export interface DataTableHeaderProps {
  table: TanStackTablePrimitive<any>
  classNames?: DataTableProps["classNames"]

  noBordered?: boolean
  enableSorting?: boolean
  enableRowSelection?: boolean
}

const DataTableHeader = ({
  table,
  classNames,
  noBordered,
  enableSorting,
  enableRowSelection,
}: DataTableHeaderProps) => {
  const { headerId } = useBaseDataTable()

  return (
    <Table
      wrapperId={headerId}
      className={classNames?.tableClassName}
      wrapperClassName={cn(
        "overflow-y-scroll",
        "!overflow-x-hidden",
        [noBordered ? "" : "border"],
        classNames?.tableContainerClassName
      )}
    >
      <TableHeader
        className={cn("table-fixed table w-full sticky z-10", classNames?.tableHeaderClassName)}
        style={{ insetBlockStart: 0 }}
      >
        {table.getHeaderGroups().map((headerGroup) => {
          const { headers } = headerGroup

          let stickyOffset = 0

          return (
            <TableRow key={headerGroup.id} className={cn(classNames?.tableHeaderTrClassName)}>
              {headers.map((header, index) => {
                const headerColumnDef = header.column.columnDef as ColumnDef<any>
                const headerSize = header.getSize()
                const headerContent = header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())

                const sortedBy = header.column.getIsSorted()
                const SortIcon = sortedBy ? SortIcons[sortedBy] : null

                const isSelectionColumn = enableRowSelection ? index === 0 : false
                const isEnableStickyColumn = headerColumnDef.enableSticky

                const cssWidth = headerSize
                const cssLeftOffset = isEnableStickyColumn ? stickyOffset : undefined

                if (isEnableStickyColumn) {
                  stickyOffset += cssWidth
                }

                return (
                  <TableHead
                    key={header.id}
                    style={{
                      width: cssWidth,
                      left: cssLeftOffset,
                    }}
                    className={cn(
                      [enableSorting ? "cursor-pointer" : null],
                      [isEnableStickyColumn ? "sticky" : null],
                      classNames?.tableHeaderThClassName
                    )}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {enableSorting && !isSelectionColumn ? (
                      <div className="flex items-center gap-2">
                        {headerContent}
                        {enableSorting && SortIcon ? (
                          <SortIcon className="w-4 h-4" />
                        ) : (
                          <ChevronsUpDown className="w-4 h-4" />
                        )}
                      </div>
                    ) : (
                      headerContent
                    )}
                  </TableHead>
                )
              })}
            </TableRow>
          )
        })}
      </TableHeader>
    </Table>
  )
}

export default DataTableHeader
