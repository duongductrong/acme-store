"use client"

import LinkOriginal, { LinkProps as LinkOriginalProps } from "next/link"
import { AnchorHTMLAttributes, useTransition } from "react"
import { revalidateByCookie } from "./actions"

export interface LinkProps
  extends Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof LinkOriginalProps
    >,
    LinkOriginalProps {
  dynamic?: boolean
}

const Link = ({ href, children, dynamic = false, ...props }: LinkProps) => {
  const [isPending, startTransition] = useTransition()

  const handleRevalidate = () => {
    startTransition(() => {
      revalidateByCookie()
    })
  }

  // if (isPending) return <Loader2 className="w-4 h-4 animate-spin" />

  return (
    <LinkOriginal
      {...props}
      href={href}
      onClick={dynamic ? handleRevalidate : () => null}
    >
      {children}
    </LinkOriginal>
  )
}

export default Link
