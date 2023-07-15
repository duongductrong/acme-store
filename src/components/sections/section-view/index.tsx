import { Skeleton } from "@/components/ui/skeleton"
import { HTMLAttributes, ReactNode, forwardRef } from "react"
import SectionPaper from "../section-paper"

export interface SectionViewProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  whereTopRight?: ReactNode
  children?: ReactNode

  skeleton?: boolean
}

const SectionView = forwardRef<HTMLDivElement, SectionViewProps>(
  (
    { title, whereTopRight, skeleton = false, children }: SectionViewProps,
    ref
  ) => {
    if (skeleton) {
      return (
        <div className="w-full h-full" ref={ref}>
          <div className="mb-4 flex items-center justify-between">
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
      <div className="w-full h-full" ref={ref}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          {whereTopRight ? (
            <div className="ml-auto">{whereTopRight}</div>
          ) : null}
        </div>

        <SectionPaper>{children}</SectionPaper>
      </div>
    )
  }
)

SectionView.displayName = "SectionView"

export default SectionView
