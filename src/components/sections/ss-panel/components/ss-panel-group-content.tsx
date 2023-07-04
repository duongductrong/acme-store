import clsx from "clsx"
import React, { HTMLAttributes, forwardRef } from "react"

export interface SSPanelGroupContentProps
  extends HTMLAttributes<HTMLDivElement> {}

const SSPanelGroupContent = forwardRef<
  HTMLDivElement,
  SSPanelGroupContentProps
>(({ children, className, ...props }, ref) => {
  return (
    <div {...props} ref={ref} className={clsx(className)}>
      {children}
    </div>
  )
})

SSPanelGroupContent.displayName = "SSPanelGroupContent"

export default SSPanelGroupContent
