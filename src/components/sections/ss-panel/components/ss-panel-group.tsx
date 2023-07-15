import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

export interface SSPanelGroupProps extends HTMLAttributes<HTMLDivElement> {}

const SSPanelGroup = forwardRef<HTMLDivElement, SSPanelGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn("flex flex-col gap-base", className)}
      >
        {children}
      </div>
    )
  }
)

SSPanelGroup.displayName = "SSPanelGroup"

export default SSPanelGroup
