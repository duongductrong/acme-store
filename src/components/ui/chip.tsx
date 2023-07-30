import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes } from "react"

const chipVariants = cva(
  cn(
    "inline-flex items-center justify-center",
    "rounded-full text-sm font-medium ring-offset-background transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50"
  ),
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "text-xs px-4 py-2",
        sm: "text-xs px-3 py-1",
      },
      active: {
        true: "border-primary",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ChipProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof chipVariants> {}

const Chip = ({ className, size, variant, active, ...props }: ChipProps) => {
  return (
    <div
      {...props}
      className={cn(chipVariants({ variant, size, active, className }))}
    />
  )
}

export default Chip
