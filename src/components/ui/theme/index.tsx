"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ReactNode } from "react"

export interface ThemeProviderProps {
  children?: ReactNode
}

const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <NextThemeProvider
      {...props}
      defaultTheme="light"
      enableSystem={false}
      attribute="class"
    >
      {children}
    </NextThemeProvider>
  )
}

export default ThemeProvider
