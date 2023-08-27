"use client"

import { AppRouterInstance, NavigateOptions } from "next/dist/shared/lib/app-router-context"
import { useRouter as useNextRouter } from "next/navigation"
import { MouseEvent } from "react"
import { revalidateByCookie } from "../actions"
import { useInternalRouter } from "./use-internal-router"

export interface RouterInstance {
  push: (
    event: MouseEvent<HTMLAnchorElement> | string,
    options?: { scroll?: boolean; dynamic?: boolean }
  ) => void

  refresh: () => void

  prefetch: AppRouterInstance["prefetch"]

  back: AppRouterInstance["back"]

  forward: AppRouterInstance["forward"]

  replace: AppRouterInstance["replace"]

  dynamicNavigate: (href: string, options?: NavigateOptions) => void
}

export const useRouter = (): RouterInstance => {
  const router = useNextRouter()
  const { startNavigation } = useInternalRouter()

  const handleNavigation: RouterInstance["push"] = (
    event: MouseEvent<HTMLAnchorElement> | string,
    options
  ) => {
    const _options = options?.scroll ? { scroll: options?.scroll } : undefined

    if (options?.dynamic) router.refresh()

    if (typeof event !== "string") {
      event.preventDefault()
      const anchorEl = event.currentTarget as HTMLAnchorElement

      startNavigation(() => {
        router.push(anchorEl.href, _options)
      })
      return
    }

    startNavigation(() => {
      router.push(event.toString(), _options)
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
