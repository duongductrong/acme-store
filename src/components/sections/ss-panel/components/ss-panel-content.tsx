import clsx from "clsx"
import React, { HTMLAttributes, forwardRef } from "react"

export interface SSPanelContentProps extends HTMLAttributes<HTMLDivElement> {}

const SSPanelContent = forwardRef<HTMLDivElement, SSPanelContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div {...props} ref={ref} className={clsx("w-full h-fit", className)}>
        {children}
      </div>
    )
  }
)

SSPanelContent.displayName = "SSPanelContent"

export default SSPanelContent
