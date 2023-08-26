import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const inputVariants = cva(
  cn(
    "border border-input",
    "flex h-10 w-full rounded-md bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none",
    "focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 ring-offset-background"
  ),
  {
    variants: {
      hasError: {
        true: "focus-visible:ring-destructive/20",
      },
    },
    defaultVariants: {},
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, hasError, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ className, hasError }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
