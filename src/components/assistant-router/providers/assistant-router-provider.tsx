"use client"

import nProgress from "nprogress"
import {
  ReactNode,
  TransitionStartFunction,
  createContext,
  useEffect,
  useMemo,
  useTransition,
} from "react"

import "nprogress/nprogress.css"

export interface AssistantRouterContextShape {
  loading: boolean
  startNavigation: TransitionStartFunction
}

export interface AssistantRouterProviderProps {
  children: ReactNode
  enableProgressbar?: boolean
}

export const AssistantRouterContext =
  createContext<AssistantRouterContextShape>({
    loading: false,
    startNavigation: () => null,
  })

const AssistantRouterProvider = ({
  children,
  enableProgressbar = true,
}: AssistantRouterProviderProps) => {
  const [isNavigating, startNavigation] = useTransition()

  useEffect(() => {
    if (enableProgressbar) {
      nProgress.configure({ showSpinner: false })

      if (isNavigating) nProgress.start()
      else nProgress.done(true)
    }
  }, [isNavigating, enableProgressbar])

  const values = useMemo<AssistantRouterContextShape>(
    () => ({ loading: isNavigating, startNavigation }),
    [isNavigating]
  )

  return (
    <AssistantRouterContext.Provider value={values}>
      {children}
    </AssistantRouterContext.Provider>
  )
}

export default AssistantRouterProvider
