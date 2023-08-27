"use client"

import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { AnchorHTMLAttributes } from "react"
import { useRouter } from "../hooks/use-router"

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps {
  dynamic?: boolean
  scroll?: boolean
}

const Link = ({ href, children, dynamic = false, scroll, ...props }: LinkProps) => {
  const { push, dynamicNavigate } = useRouter()

  return (
    <NextLink
      {...props}
      href={href}
      onClick={dynamic ? () => (dynamicNavigate as any)(href) : (event) => push(event)}
    >
      {children}
    </NextLink>
  )
}

export default Link