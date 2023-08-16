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
          <div className="flex items-center justify-between mb-4">
            {title ? (
              <h3 className="text-base font-semibold">{title}</h3>
            ) : null}

            {headerActions ? headerActions : null}
          </div>
        ) : null,
      [title, headerActions]
    )
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          "border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 rounded-lg",
          className
        )}
      >
        {renderHeader}
        {children}
      </div>
    )
  }
)

SectionPaper.displayName = "SectionPaper"

export default SectionPaper
