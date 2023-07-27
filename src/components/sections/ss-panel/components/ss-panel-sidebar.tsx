import { cn } from "@/lib/utils"
import { HTMLAttributes, forwardRef } from "react"

export interface SSPanelSidebarProps extends HTMLAttributes<HTMLDivElement> {}

const SSPanelSidebar = forwardRef<HTMLDivElement, SSPanelSidebarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          className,
          "w-[230px] border-r border-zinc-200 dark:border-zinc-800"
        )}
      >
        {children}
      </div>
    )
  }
)

SSPanelSidebar.displayName = "SSPanelSidebar"

export default SSPanelSidebar
