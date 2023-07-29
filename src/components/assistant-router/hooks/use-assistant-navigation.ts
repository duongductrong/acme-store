"use client"

import { NavigateOptions } from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"
import { revalidateByCookie } from "../actions"
import { useAssistantRouter } from "./use-assistant-router"

export interface Navigation {}

export const useAssistantNavigation = () => {
  const router = useRouter()
  const { startNavigation } = useAssistantRouter()

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement> | string,
    scroll = false
  ) => {
    if (typeof event !== "string") {
      event.preventDefault()
      const anchorEl = event.currentTarget as HTMLAnchorElement

      startNavigation(() => {
        router.push(anchorEl.href, scroll ? { scroll } : undefined)
      })
      return
    }

    startNavigation(() => {
      router.push(event.toString(), scroll ? { scroll } : undefined)
    })
  }

  const handleDynamicNavigate = (href: string, options?: NavigateOptions) => {
    startNavigation(() => {
      revalidateByCookie()

      router.push(href, options)
    })
  }

  return {
    navigate: handleNavigation,
    dynamicNavigate: handleDynamicNavigate,
  }
}
