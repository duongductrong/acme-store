"use client"

import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { HTMLAttributes } from "react"

export interface PreferredBodyProps extends HTMLAttributes<HTMLBodyElement> {
  ifRegexMatch: string | RegExp
  then: {
    className: string
  }
  otherwise: {
    className: string
  }
}

const PreferredBody = ({
  className,
  ifRegexMatch,
  then,
  otherwise,
  ...props
}: PreferredBodyProps) => {
  const REGEX_PATTERN = new RegExp(ifRegexMatch, "g")

  const pathname = usePathname()

  const isMatchedRegex = REGEX_PATTERN.test(pathname)

  return (
    <body
      {...props}
      className={cn(
        className,
        isMatchedRegex ? then.className : otherwise.className
      )}
    />
  )
}

export default PreferredBody
