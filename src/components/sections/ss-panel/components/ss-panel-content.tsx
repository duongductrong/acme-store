import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

export interface SSPanelContentProps extends HTMLAttributes<HTMLDivElement> {}

const SSPanelContent = forwardRef<HTMLDivElement, SSPanelContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={cn("w-full h-fit", className)}>
        {children}
      </div>
    )
  }
)

SSPanelContent.displayName = "SSPanelContent"

export default SSPanelContent
