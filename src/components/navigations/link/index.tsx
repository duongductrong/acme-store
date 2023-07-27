"use client"

import LinkOriginal, { LinkProps as LinkOriginalProps } from "next/link"
import { useRouter } from "next/navigation"
import { AnchorHTMLAttributes, MouseEvent, useTransition } from "react"
import { revalidateByCookie } from "./actions"

export interface LinkProps
  extends Omit<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      keyof LinkOriginalProps
    >,
    LinkOriginalProps {
  dynamic?: boolean
  scroll?: boolean
}

const Link = ({
  href,
  children,
  dynamic = false,
  scroll,
  ...props
}: LinkProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleRevalidate = () => {
    startTransition(() => {
      revalidateByCookie()
    })
  }

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    startTransition(() => {
      router.push(href.toString(), scroll ? { scroll } : undefined)
    })
  }

  return (
    <LinkOriginal
      {...props}
      href={href}
      onClick={dynamic ? handleRevalidate : () => handleNavigation}
    >
      {children}
    </LinkOriginal>
  )
}

export default Link
