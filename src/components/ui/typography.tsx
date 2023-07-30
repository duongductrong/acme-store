import { Slot } from "@radix-ui/react-slot"
import { VariantProps, cva } from "class-variance-authority"
import { HTMLAttributes } from "react"

export const typoVariants = cva("", {
  variants: {
    variant: {
      h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      h2: "scroll-m-20 text-3xl font-semibold tracking-tight transition-colors",
      h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
      h4: "scroll-m-20 text-xl font-semibold tracking-tight",
      h5: "scroll-m-20 text-lg font-semibold tracking-tight",
      h6: "scroll-m-20 text-base font-semibold tracking-tight",
      p: "leading-7",
      blockquote: "mt-6 border-l-2 pl-6 italic",
      ui: "my-6 ml-6 list-disc [&>li]:mt-2",
      code: "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      lead: "text-xl text-muted-foreground",
      small: "text-xs font-medium leading-none",
      muted: "text-sm text-muted-foreground",
    },
  },
  defaultVariants: {
    variant: "p",
  },
})

export interface TypographyProps
  extends HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof typoVariants> {
  asChild?: boolean
}

const Typography = ({
  className,
  variant,
  asChild = false,
  ...props
}: TypographyProps) => {
  const Comp = asChild ? Slot : "p"
  return <Comp {...props} className={typoVariants({ className, variant })} />
}

export default Typography
