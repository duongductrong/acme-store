"use client"

import Link, { LinkProps } from "next/link"
import { AnchorHTMLAttributes, useTransition } from "react"
import { revalidateByCookie } from "./actions"

export interface DynamicLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps>,
    LinkProps {
  dynamic?: boolean
}

const DynamicLink = ({
  href,
  children,
  dynamic = false,
  ...props
}: DynamicLinkProps) => {
  const [isPending, startTransition] = useTransition()

  const handleRevalidate = () => {
    startTransition(() => {
      revalidateByCookie()
    })
  }

  // if (isPending) return <Loader2 className="w-4 h-4 animate-spin" />

  return (
    <Link {...props} href={href} onClick={dynamic ? handleRevalidate : () => null}>
      {children}
    </Link>
  )
}

export default DynamicLink
