import { cn } from "@/lib/utils"
import { HTMLAttributes, ReactNode } from "react"

export interface ListCollapseProps extends HTMLAttributes<HTMLDivElement> {}

const ListCollapse = ({ className, children, ...props }: ListCollapseProps) => {
  return (
    <div {...props} className={cn("flex flex-col pl-4", className)}>
      {children}
    </div>
  )
}

export default ListCollapse
