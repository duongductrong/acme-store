import { cn } from "@/lib/utils"
import { HTMLAttributes, ReactNode, forwardRef, useMemo } from "react"

export interface SectionPaperProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  children?: ReactNode

  headerActions?: ReactNode

  customClassNames?: {
    headerClassName?: string
    contentClassName?: string
  }
}

const SectionPaper = forwardRef<HTMLDivElement, SectionPaperProps>(
  ({ children, className, title, headerActions, customClassNames, ...props }, ref) => {
    const renderHeader = useMemo(
      () =>
        title || headerActions ? (
          <div
            className={cn(
              "flex items-center justify-between mb-2",
              customClassNames?.headerClassName
            )}
          >
            {title ? <h3 className="text-lg font-medium">{title}</h3> : null}

            {headerActions ? headerActions : null}
          </div>
        ) : null,
      [title, headerActions, customClassNames?.headerClassName]
    )
    return (
      <div ref={ref} {...props} className={cn(className)}>
        {renderHeader}
        <div
          className={cn(
            "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 rounded-lg",
            customClassNames?.contentClassName
          )}
        >
          {children}
        </div>
      </div>
    )
  }
)

SectionPaper.displayName = "SectionPaper"

export default SectionPaper
