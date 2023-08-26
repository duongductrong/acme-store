import { cn } from "@/lib/utils"
import { AsComponentGenericType, AsComponentProps, AsProps } from "@/types/as-component-generic"
import { VariantProps, cva } from "class-variance-authority"
import { LucideIcon, LucideProps } from "lucide-react"
import { ForwardRefExoticComponent, HTMLAttributes, RefAttributes, SVGAttributes } from "react"

const listItemVariants = cva(
  cn("relative justify-start h-10 px-4", "flex items-center text-sm", "rounded-lg font-medium"),
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

export interface ListItemProps<T extends AsComponentGenericType>
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof listItemVariants>,
    AsProps<T> {
  prefixIcon?: ForwardRefExoticComponent<
    SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement>
  >
}

const ListItem = <T extends AsComponentGenericType = "div">({
  active,
  children,
  className,
  asChild,
  hover,
  as: AsComponent = "div",
  prefixIcon: PrefixIcon,
  ...props
}: AsComponentProps<T, ListItemProps<T>>) => {
  return (
    <AsComponent {...props} className={cn(listItemVariants({ className, active, hover }))}>
      {PrefixIcon ? <PrefixIcon className="w-4 h-4 mr-base" /> : null}
      {children}
    </AsComponent>
  )
}

export default ListItem
