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

export interface RouterContextShape {
  loading: boolean
  startNavigation: TransitionStartFunction
}

export interface RouterProviderProps {
  children: ReactNode
  enableProgressbar?: boolean
}

export const RouterContext = createContext<RouterContextShape>({
  loading: false,
  startNavigation: () => null,
})

const RouterProvider = ({ children, enableProgressbar = true }: RouterProviderProps) => {
  const [isNavigating, startNavigation] = useTransition()

  useEffect(() => {
    if (enableProgressbar) {
      nProgress.configure({ showSpinner: false })

      if (isNavigating) nProgress.start()
      else nProgress.done(true)
    } else {
      nProgress.done(true)
    }
  }, [isNavigating, enableProgressbar])

  const values = useMemo<RouterContextShape>(
    () => ({ loading: isNavigating, startNavigation }),
    [isNavigating]
  )

  return <RouterContext.Provider value={values}>{children}</RouterContext.Provider>
}

export default RouterProvider
