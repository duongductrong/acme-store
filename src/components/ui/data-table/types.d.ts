import { AccessorColumnDef, DisplayColumnDef, GroupColumnDef } from "@tanstack/react-table"

declare module "@tanstack/react-table" {
  export type CustomColumnDef = {
    enableSticky?: boolean
  }

  type ColumnDef<TData extends RowData, TValue = unknown> = (
    | DisplayColumnDef<TData, TValue>
    | GroupColumnDef<TData, TValue>
    | AccessorColumnDef<TData, TValue>
  ) &
    CustomColumnDef
}
