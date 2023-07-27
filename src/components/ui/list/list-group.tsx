import { cn } from "@/lib/utils"
import { HTMLAttributes, ReactNode } from "react"

export interface ListGroupProps extends HTMLAttributes<HTMLDivElement> {}

const ListGroup = ({ className, children, ...props }: ListGroupProps) => {
  return <div {...props} className={cn("flex flex-col", className)}>{children}</div>
}

export default ListGroup
