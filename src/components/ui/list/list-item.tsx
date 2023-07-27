import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes } from "react"

const listItemVariants = cva(
  cn(
    "relative justify-start h-10 px-4",
    "flex items-center text-sm",
    "rounded-lg"
  ),
  {
    variants: {
      hover: {
        true: "hover:bg-zinc-200/50 dark:hover:bg-zinc-900/50",
      },
      active: {
        true: "text-foreground font-medium bg-zinc-200/50 dark:bg-zinc-900/50",
        false: "text-muted-foreground font-normal",
      },
    },
    defaultVariants: {
      active: false,
      hover: true,
    },
  }
)

export interface ListPropsProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof listItemVariants> {
  asChild?: boolean
}

const ListItem = ({
  active,
  children,
  className,
  asChild,
  hover,
  ...props
}: ListPropsProps) => {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      {...props}
      className={cn(listItemVariants({ className, active, hover }))}
    >
      {children}
    </Comp>
  )
}

export default ListItem
