"use client"

import { ReactNode, createContext, useId, useMemo } from "react"

export interface DataTableContextType {
  dataTableId: string
  bodyId: string
  headerId: string
}

export const DataTableContext = createContext<DataTableContextType>({
  dataTableId: "",
  bodyId: "",
  headerId: "",
})

export interface DataTableProviderProps {
  children: ReactNode
}

const DataTableProvider = ({ children }: DataTableProviderProps) => {
  const id = useId().replaceAll(":", "-")

  const headerId = `${id}DataTableHeader`
  const bodyId = `${id}DataTableBody`

  const values = useMemo<DataTableContextType>(
    () => ({ dataTableId: id, bodyId, headerId }),
    [id, headerId, bodyId]
  )

  return <DataTableContext.Provider value={values}>{children}</DataTableContext.Provider>
}

export default DataTableProvider
