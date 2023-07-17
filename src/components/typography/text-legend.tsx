import { cn } from "@/lib/utils"
import { forwardRef } from "react"
import Text, { TextProps } from "./text"

export interface TextLegendProps extends TextProps {}

const TextLegend = forwardRef<HTMLElement, TextLegendProps>(
  ({ size, weight, transform, className, ...props }, ref) => {
    return (
      <Text
        {...props}
        size="xs"
        weight="medium"
        transform="normal"
        className={cn(className)}
      />
    )
  }
)

TextLegend.displayName = "TextLegend"

export default TextLegend
