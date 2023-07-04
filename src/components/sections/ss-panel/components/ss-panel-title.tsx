import clsx from "clsx"
import React, { HTMLAttributes, ReactNode, forwardRef } from "react"

export interface SSPanelTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

const SSPanelTitle = forwardRef<HTMLHeadingElement, SSPanelTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h2
        {...props}
        ref={ref}
        className={clsx("mb-8 text-xl font-semibold", className)}
      >
        {children}
      </h2>
    )
  }
)

SSPanelTitle.displayName = "SSPanelTitle"

export default SSPanelTitle
