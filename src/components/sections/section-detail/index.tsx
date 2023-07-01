import { ReactNode, forwardRef } from "react"

export interface SectionDetailProps {
  children: ReactNode
}

const SectionDetail = forwardRef<HTMLDivElement, SectionDetailProps>(
  ({ children, ...props }, ref) => {
    return (
      <div {...props} ref={ref}>
        {children}
      </div>
    )
  }
)

SectionDetail.displayName = "SectionDetail"

export default SectionDetail
