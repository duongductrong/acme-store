import { HTMLAttributes, ReactNode, forwardRef } from "react"

export interface SectionViewProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  whereTopRight?: ReactNode
  children: ReactNode
}

const SectionView = forwardRef<HTMLDivElement, SectionViewProps>(
  ({ title, whereTopRight, children }: SectionViewProps, ref) => {
    return (
      <div className="w-full h-full" ref={ref}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          {whereTopRight ? (
            <div className="ml-auto">{whereTopRight}</div>
          ) : null}
        </div>

        <div className="p-4 bg-white rounded-lg border border-neutral-200 shadow-sm">
          {children}
        </div>
      </div>
    )
  }
)

SectionView.displayName = "SectionView"

export default SectionView
