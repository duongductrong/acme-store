import { cn } from "@/lib/utils"
import { HTMLAttributes, ReactNode, forwardRef, useMemo } from "react"

export interface SectionPaperProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  children?: ReactNode

  headerActions?: ReactNode
}

const SectionPaper = forwardRef<HTMLDivElement, SectionPaperProps>(
  ({ children, className, title, headerActions, ...props }, ref) => {
    const renderHeader = useMemo(
      () =>
        title || headerActions ? (
          <div className="flex items-center justify-between mb-2">
            {title ? <h3 className="text-lg font-medium">{title}</h3> : null}

            {headerActions ? headerActions : null}
          </div>
        ) : null,
      [title, headerActions]
    )
    return (
      <div ref={ref} {...props} className={className}>
        {renderHeader}
        <div
          className={cn(
            "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 rounded-lg"
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
