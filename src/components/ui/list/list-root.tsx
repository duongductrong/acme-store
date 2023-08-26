import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes, createContext, useMemo } from "react"

export interface ListRootContextType {}

export const ListRootContext = createContext<ListRootContextType>({})

export const listRootVariants = cva("flex flex-col p-base gap-base", {
  variants: {},
})

export interface ListRootProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listRootVariants> {}

const ListRoot = ({ className, children, ...props }: ListRootProps) => {
  const values = useMemo(() => ({}), [])

  return (
    <ListRootContext.Provider value={values}>
      <div {...props} className={cn(listRootVariants({ className }))}>
        {children}
      </div>
    </ListRootContext.Provider>
  )
}

export default ListRoot
