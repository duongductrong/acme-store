"use client"

import NextLink, { LinkProps as NextLinkProps } from "next/link"
import { AnchorHTMLAttributes, MouseEvent, forwardRef } from "react"
import type * as Polymorphic from "@/types/react-polymorphic"
import { useRouter } from "../hooks/use-router"

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof NextLinkProps>,
    NextLinkProps {
  dynamic?: boolean
  scroll?: boolean
}

const Link = forwardRef(({ href, children, dynamic = false, scroll, ...props }, ref) => {
  const { push, dynamicNavigate } = useRouter()

  const handlePushDynamic = (event: MouseEvent<HTMLAnchorElement>) => {
    ;(dynamicNavigate as any)(href)

    if (props.onClick) {
      props.onClick(event)
    }
  }

  const handlePushPrimitive = (event: MouseEvent<HTMLAnchorElement>) => {
    push(event)

    if (props.onClick) {
      props.onClick(event)
    }
  }

  return (
    <NextLink
      {...props}
      ref={ref}
      href={href}
      onClick={dynamic ? handlePushDynamic : handlePushPrimitive}
    >
      {children}
    </NextLink>
  )
}) as Polymorphic.ForwardRefComponent<Polymorphic.IntrinsicElement<typeof NextLink>, LinkProps>

Link.displayName = "Link"

export default Link
