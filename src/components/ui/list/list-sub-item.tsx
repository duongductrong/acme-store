import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes } from "react"

export const listSubItemVariants = cva(
  cn(
    "flex items-center justify-start",
    "h-10 hover:bg-transparent ml-6 px-0 text-[13px]"
  ),
  {
    variants: {
      active: {
        true: "text-foreground font-medium",
        false: "text-neutral-600 dark:text-neutral-400 font-normal",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

export interface ListSubItemProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof listSubItemVariants> {
  asChild?: boolean
}

const ListSubItem = ({
  children,
  className,
  active,
  asChild,
  ...props
}: ListSubItemProps) => {
  const Comp = asChild ? Slot : "div"
  return (
    <Comp {...props} className={cn(listSubItemVariants({ className, active }))}>
      {children}
    </Comp>
  )
}

export default ListSubItem
