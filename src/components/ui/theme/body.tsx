"use client"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { HTMLAttributes } from "react"

export interface BodyProps extends HTMLAttributes<HTMLBodyElement> {}

const REGEX_ADMIN_PATTERN = /^\/admin\/*/g

const Body = ({ className, ...props }: BodyProps) => {
  const pathname = usePathname()

  const isAdmin = REGEX_ADMIN_PATTERN.test(pathname)
  const isStorefront = !isAdmin

  return (
    <body
      {...props}
      className={cn(className, isStorefront ? "storefront" : "")}
    />
  )
}

export default Body
