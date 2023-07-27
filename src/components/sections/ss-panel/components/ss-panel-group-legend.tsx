import TextLegend from "@/components/typography/text-legend"
import { HTMLAttributes, forwardRef } from "react"

export interface SSPanelGroupLegendProps extends HTMLAttributes<HTMLElement> {}

const SSPanelGroupLegend = forwardRef<HTMLElement, SSPanelGroupLegendProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <TextLegend ref={ref} {...props} className="mb-2 text-zinc-500">
        {children}
      </TextLegend>
    )
  }
)

SSPanelGroupLegend.displayName = "SSPanelGroupLegend"

export default SSPanelGroupLegend
