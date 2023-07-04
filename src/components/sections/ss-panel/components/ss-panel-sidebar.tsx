import clsx from "clsx"
import React, { HTMLAttributes, forwardRef } from "react"

export interface SSPanelSidebarProps extends HTMLAttributes<HTMLDivElement> {}

const SSPanelSidebar = forwardRef<HTMLDivElement, SSPanelSidebarProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx(className, "w-[230px] border-r border-neutral-200")}
      >
        {children}
      </div>
    )
  }
)

SSPanelSidebar.displayName = "SSPanelSidebar"

export default SSPanelSidebar
