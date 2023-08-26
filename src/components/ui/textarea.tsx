import * as React from "react"

import { cn } from "@/lib/utils"
import { VariantProps, cva } from "class-variance-authority"

const textareaVariants = cva(
  cn(
    "flex min-h-[80px] w-full rounded-md border border-input focus-within:border-primary bg-transparent px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50",
    "ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/10"
  ),
  {
    variants: {
      hasError: {
        true: "focus-visible:ring-destructive/20",
      },
    },
    defaultVariants: {
      hasError: false,
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, hasError, ...props }, ref) => {
    return (
      <textarea className={cn(textareaVariants({ className, hasError }))} ref={ref} {...props} />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
