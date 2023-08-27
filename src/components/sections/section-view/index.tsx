import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { HTMLAttributes, ReactNode, forwardRef } from "react"
import SectionPaper from "../section-paper"

export interface SectionViewProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  whereTopRight?: ReactNode
  children?: ReactNode

  skeleton?: boolean

  customClassNames?: Partial<{
    headerClassName: string
    contentClassName: string
    paperContentClassName: string
  }>
}

const SectionView = forwardRef<HTMLDivElement, SectionViewProps>(
  (
    {
      title,
      description,
      whereTopRight,
      skeleton = false,
      children,
      className,
      customClassNames,
    }: SectionViewProps,
    ref
  ) => {
    if (skeleton) {
      return (
        <div className="w-full h-full" ref={ref}>
          <div className="mb-base flex items-center justify-between">
            <Skeleton className="text-xl font-semibold w-[150px] h-[35px]" />
            <Skeleton className="ml-auto w-[200px] h-[35px]" />
          </div>

          <SectionPaper>
            <Skeleton className="ml-auto h-[300px]" />
          </SectionPaper>
        </div>
      )
    }

    return (
      <div className={cn("w-full h-full", className)} ref={ref}>
        <div
          className={cn(
            "mb-base flex items-center justify-between",
            customClassNames?.headerClassName
          )}
        >
          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            {description ? <p className="text-sm mt-2 text-foreground/60">{description}</p> : null}
          </div>
          {whereTopRight ? <div className="ml-auto">{whereTopRight}</div> : null}
        </div>

        <SectionPaper
          className={customClassNames?.contentClassName}
          customClassNames={{ contentClassName: customClassNames?.paperContentClassName }}
        >
          {children}
        </SectionPaper>
      </div>
    )
  }
)

SectionView.displayName = "SectionView"

export default SectionView
