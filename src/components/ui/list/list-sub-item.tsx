import { cn } from "@/lib/utils"
import { AsComponentGenericType, AsComponentProps, AsProps } from "@/types/as-component-generic"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes } from "react"

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

export interface ListSubItemProps<T extends AsComponentGenericType>
  extends AsProps<T, HTMLAttributes<HTMLElement> & VariantProps<typeof listSubItemVariants>> {
  asChild?: boolean
}

const ListSubItem = <T extends AsComponentGenericType = "div">({
  children,
  className,
  active,
  asChild,
  as: AsComponent = "div",
  ...props
}: AsComponentProps<T, ListSubItemProps<T>>) => {
  return (
    <AsComponent {...props} className={cn(listSubItemVariants({ className, active }))}>
      {children}
    </AsComponent>
  )
}

export default ListSubItem
