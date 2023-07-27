import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes } from "react"

export const listRootVariants = cva("flex flex-col p-base gap-base", {
  variants: {},
})

export interface ListRootProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listRootVariants> {}

const ListRoot = ({ className, children, ...props }: ListRootProps) => {
  return (
    <div {...props} className={cn(listRootVariants({ className }))}>
      {children}
    </div>
  )
}

export default ListRoot
