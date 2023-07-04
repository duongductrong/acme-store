import Link from "@/components/navigations/link"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
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
      <section
        {...props}
        ref={ref}
        className={clsx("max-w-[940px] mx-auto", wrapperClassName)}
      >
        <header className="flex items-center mb-4">
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" className="mr-4" asChild>
              <Link href={backTo}>
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>

          {whereTopRight && (
            <div className={clsx("ml-auto flex gap-2", whereTopRightClassName)}>
              {whereTopRight}
            </div>
          )}
        </header>
        <main className={clsx("w-full h-full", mainClassName)}>{children}</main>
      </section>
    )
  }
)

SectionDetail.displayName = "SectionDetail"

export default SectionDetail
