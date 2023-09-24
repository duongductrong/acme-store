import PreferredBody from "@/components/ui/theme/preferred-body"
import PreferredHTML from "@/components/ui/theme/preferred-html"
import { inter } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import PreferredThemeProvider from "@/components/ui/theme/preferred-theme-provider"
import TrpcProvider from "@/components/trpc-provider"
import { RouterProvider } from "@/components/router"

type Props = {
  children: ReactNode
}

// Even though this component is just passing its children through, the presence
// of this file fixes an issue in Next.js 13.4 where link clicks that switch
// the locale would otherwise cause a full reload.
export default function Document({ children }: Props) {
  return (
    <PreferredHTML>
      <PreferredBody
        ifRegexMatch={"^(/admin/)(.+)"}
        then={{ className: "bg-body" }}
        otherwise={{ className: "storefront" }}
        className={cn(inter.className)}
      >
        <PreferredThemeProvider>
          <TrpcProvider>
            <RouterProvider>{children}</RouterProvider>
          </TrpcProvider>
        </PreferredThemeProvider>
      </PreferredBody>
    </PreferredHTML>
  )
}
