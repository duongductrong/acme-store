"use client"

import {
  AppRouterInstance,
  NavigateOptions,
} from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import { MouseEvent } from "react"
import { revalidateByCookie } from "../actions"
import { useAssistantRouter } from "./use-assistant-router"

export interface AssistantNavigationInstance {
  push: (
    event: MouseEvent<HTMLAnchorElement> | string,
    scroll?: boolean
  ) => void

  refresh: () => void

  prefetch: AppRouterInstance["prefetch"]

  back: AppRouterInstance["back"]

  forward: AppRouterInstance["forward"]

  replace: AppRouterInstance["replace"]

  dynamicNavigate: (href: string, options?: NavigateOptions) => void
}

export const useAssistantNavigation = (): AssistantNavigationInstance => {
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

  const handleRefresh = () => {
    startNavigation(() => {
      router.refresh()
    })
  }

  const handlePrefetch: AppRouterInstance["prefetch"] = (...args) => {
    startNavigation(() => {
      router.prefetch(...args)
    })
  }

  const handleBack: AppRouterInstance["back"] = (...args) => {
    startNavigation(() => {
      router.back(...args)
    })
  }

  const handleForward: AppRouterInstance["forward"] = (...args) => {
    startNavigation(() => {
      router.forward(...args)
    })
  }

  const handleReplace: AppRouterInstance["replace"] = (...args) => {
    startNavigation(() => {
      router.replace(...args)
    })
  }

  const handleDynamicNavigate = (href: string, options?: NavigateOptions) => {
    startNavigation(() => {
      revalidateByCookie()

      router.push(href, options)
    })
  }

  return {
    push: handleNavigation,
    refresh: handleRefresh,
    prefetch: handlePrefetch,
    back: handleBack,
    forward: handleForward,
    replace: handleReplace,
    dynamicNavigate: handleDynamicNavigate,
  }
}
