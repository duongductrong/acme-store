"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const ToggleDarkLightMode = () => {
  const { theme, setTheme } = useTheme()

  const handleToggleThemeMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const IconMode = theme === "dark" ? Moon : Sun

  return <IconMode role="button" className="w-4 h-4" onClick={handleToggleThemeMode} />
}

export default ToggleDarkLightMode
