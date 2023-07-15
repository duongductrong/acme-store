import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

export interface SSPanelGroupContentProps
  extends HTMLAttributes<HTMLDivElement> {}

const SSPanelGroupContent = forwardRef<
  HTMLDivElement,
  SSPanelGroupContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className={cn(className)}>
      {children}
    </div>
  )
})

SSPanelGroupContent.displayName = "SSPanelGroupContent"

export default SSPanelGroupContent
