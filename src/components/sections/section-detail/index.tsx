import { Link } from "@/components/router"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import { ReactNode, forwardRef } from "react"

export interface SectionDetailProps {
  title: string
  whereTopRight?: ReactNode
  children: ReactNode
  backTo: string

  wrapperClassName?: string
  mainClassName?: string
  whereTopRightClassName?: string
}

const SectionDetail = forwardRef<HTMLDivElement, SectionDetailProps>(
  (
    {
      children,
      title,
      backTo,
      whereTopRight,
      wrapperClassName,
      mainClassName,
      whereTopRightClassName,
      ...props
    },
    ref
  ) => {
    return (
      <section {...props} ref={ref} className={cn("max-w-[940px] mx-auto", wrapperClassName)}>
        <header className="flex items-center mb-lg">
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" className="mr-base h-12 w-12" asChild>
              <Link href={backTo}>
                <ArrowLeft className="w-8 h-8" />
              </Link>
            </Button>
            <div className="flex flex-col gap-1">
              <p className="text-muted-foreground text-xs">Back to previous page</p>
              <h2 className="text-xl font-semibold">{title}</h2>
            </div>
          </div>

          {whereTopRight && (
            <div className={cn("ml-auto flex gap-2", whereTopRightClassName)}>{whereTopRight}</div>
          )}
        </header>
        <main className={cn("w-full h-full", mainClassName)}>{children}</main>
      </section>
    )
  }
)

SectionDetail.displayName = "SectionDetail"

export default SectionDetail
