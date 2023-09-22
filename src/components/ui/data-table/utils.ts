/* eslint-disable consistent-return */
/* eslint-disable default-case */
import { safeParseNumber } from "@/lib/number"
import { DataTablePagination } from "./data-table"

export const getCanNextPageBasedType = (
  data: DataTablePagination,
  pageCount: number
) => {
  switch (data.type) {
    case "offset":
      return safeParseNumber(data.page, 0) + 1 <= pageCount
    case "cursor-based":
      return null
  }
}

export const getCanPreviousPageBasedType = (data: DataTablePagination) => {
  switch (data.type) {
    case "offset":
      return safeParseNumber(data.page, 0) - 1 >= 1
    case "cursor-based":
      return null
  }
}
