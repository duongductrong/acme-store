import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes, forwardRef } from "react"

export const textVariants = cva("text-zinc-700 dark:text-zinc-300", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
    },
    weight: {
      thin: "font-thin",
      extraLight: "font-extralight",
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extraBold: "font-extrabold",
      black: "font-black",
    },
    transform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      normal: "",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "medium",
    transform: "normal",
  },
})

export interface TextProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof textVariants> {
  asChild?: boolean
}

const Text = forwardRef<HTMLSpanElement, TextProps>(
  ({ className, asChild, size, weight, transform, ...props }: TextProps) => {
    const Comp = asChild ? Slot : "p"
    return (
      <Comp
        {...props}
        className={cn(textVariants({ size, weight, transform, className }))}
      />
    )
  }
)

Text.displayName = "Text"

export default Text
