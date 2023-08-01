"use client"

import { ThemeProvider as NextThemeProvider } from "next-themes"
import { ReactNode } from "react"

export interface PreferredThemeProviderProps {
  children?: ReactNode
}

const PreferredThemeProvider = ({ children, ...props }: PreferredThemeProviderProps) => {
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

export default PreferredThemeProvider
