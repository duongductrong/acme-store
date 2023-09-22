import { useContext } from "react"
import { DataTableContext } from "./data-table-provider"

export const useBaseDataTable = () => useContext(DataTableContext)
