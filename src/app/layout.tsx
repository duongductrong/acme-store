import PreferredBody from "@/components/ui/theme/preferred-body"
import PreferredHTML from "@/components/ui/theme/preferred-html"
import { inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

// Even though this component is just passing its children through, the presence
// of this file fixes an issue in Next.js 13.4 where link clicks that switch
// the locale would otherwise cause a full reload.
export default function RootLayout({ children }: Props) {
  return (
    <PreferredHTML>
      <PreferredBody
        ifRegexMatch={"^(/admin/)(.+)"}
        then={{ className: "bg-body" }}
        otherwise={{ className: "storefront" }}
        className={cn(inter.className)}
      >
        {children}
      </PreferredBody>
    </PreferredHTML>
  )
}
