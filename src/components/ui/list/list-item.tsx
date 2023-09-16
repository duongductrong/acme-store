import { cn } from "@/lib/utils"
import type * as Polymorphic from "@/types/react-polymorphic"
import { VariantProps, cva } from "class-variance-authority"
import {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
  SVGAttributes,
  forwardRef,
} from "react"

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

export interface ListItemProps
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof listItemVariants> {
  prefixIcon?: ForwardRefExoticComponent<
    SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement>
  >
}

const ListItem = forwardRef(
  (
    { active, children, className, hover, as: Comp = "div", prefixIcon: PrefixIcon, ...props },
    ref
  ) => {
    return (
      <Comp {...props} className={cn(listItemVariants({ className, active, hover }))}>
        {PrefixIcon ? <PrefixIcon className="w-4 h-4 mr-base" /> : null}
        {children}
      </Comp>
    )
  }
) as Polymorphic.ForwardRefComponent<"div", ListItemProps>

ListItem.displayName = "ListItem"

export default ListItem
