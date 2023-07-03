"use client"

import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"

export interface NextThemeProviderProps {
  children?: ReactNode
}

const NextThemeProvider = ({ children, ...props }: NextThemeProviderProps) => {
  return (
    <ThemeProvider
      {...props}
      defaultTheme="light"
      enableSystem={false}
      attribute="class"
    >
      {children}
    </ThemeProvider>
  )
}

export default NextThemeProvider
