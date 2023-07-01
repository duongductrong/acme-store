import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { ReactNode, forwardRef } from "react"

export interface SectionDetailProps {
  title: string
  whereTopRight?: ReactNode
  children: ReactNode
}

const SectionDetail = forwardRef<HTMLDivElement, SectionDetailProps>(
  ({ children, title, whereTopRight, ...props }, ref) => {
    return (
      <section {...props} ref={ref} className="max-w-[940px] mx-auto">
        <header className="flex items-center mb-4">
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" className="mr-4">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>

          {whereTopRight && (
            <div className="ml-auto flex gap-2">{whereTopRight}</div>
          )}
        </header>
        <main className="w-full h-full">{children}</main>
      </section>
    )
  }
)

SectionDetail.displayName = "SectionDetail"

export default SectionDetail
