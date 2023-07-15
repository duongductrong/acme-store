import clsx from "clsx"
import React, { HTMLAttributes, forwardRef } from "react"

export interface SSPanelGroupProps extends HTMLAttributes<HTMLDivElement> {}

const SSPanelGroup = forwardRef<HTMLDivElement, SSPanelGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={clsx("flex flex-col gap-base", className)}
      >
        {children}
      </div>
    )
  }
)

SSPanelGroup.displayName = "SSPanelGroup"

export default SSPanelGroup
