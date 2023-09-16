import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes, forwardRef } from "react"
import type * as Polymorphic from "@/types/react-polymorphic"

export const listSubItemVariants = cva(
  cn("flex items-center justify-start", "h-10 hover:bg-transparent ml-6 px-0 text-[13px]"),
  {
    variants: {
      active: {
        true: "text-foreground font-medium",
        false: "text-zinc-600 dark:text-zinc-400 font-normal",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

export interface ListSubItemProps extends VariantProps<typeof listSubItemVariants> {
  asChild?: boolean
}

const ListSubItem = forwardRef(
  ({ children, className, active, asChild, as: AsComponent = "div", ...props }, ref) => {
    return (
      <AsComponent {...props} className={cn(listSubItemVariants({ className, active }))}>
        {children}
      </AsComponent>
    )
  }
) as Polymorphic.ForwardRefComponent<"div", ListSubItemProps>

ListSubItem.displayName = "ListSubItem"

export default ListSubItem
