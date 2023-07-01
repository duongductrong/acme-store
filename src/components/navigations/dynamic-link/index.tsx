"use client"

import { Loader2 } from "lucide-react"
import Link, { LinkProps } from "next/link"
import { AnchorHTMLAttributes, useTransition } from "react"
import { revalidateByCookie } from "./actions"

export interface DynamicLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps {}

const DynamicLink = ({ href, children, ...props }: DynamicLinkProps) => {
  const [isPending, startTransition] = useTransition()

  const handleRevalidate = () => {
    startTransition(() => {
      revalidateByCookie()
    })
  }

  if (isPending) return <Loader2 className="w-4 h-4 animate-spin" />

  return (
    <Link {...props} href={href} onClick={handleRevalidate}>
      {children}
    </Link>
  )
}

export default DynamicLink
