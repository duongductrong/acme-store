import { cn } from "@/lib/utils"
import { HTMLAttributes, ReactNode, forwardRef } from "react"

export interface SectionPaperProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  children?: ReactNode
}

const SectionPaper = forwardRef<HTMLDivElement, SectionPaperProps>(
  ({ children, className, title, ...props }, ref) => {
    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          "border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-5 rounded-lg",
          className
        )}
      >
        {title ? (
          <h3 className="text-base font-semibold mb-5">{title}</h3>
        ) : null}
        {children}
      </div>
    )
  }
)

SectionPaper.displayName = "SectionPaper"

export default SectionPaper
