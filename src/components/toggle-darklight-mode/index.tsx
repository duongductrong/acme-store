"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

const ToggleDarkLightMode = () => {
  const { theme, setTheme } = useTheme()

  const handleToggleThemeMode = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const IconMode = theme === "dark" ? Moon : Sun

  return (
    <Button size="sm" variant="ghost" onClick={handleToggleThemeMode}>
      <IconMode className="w-4 h-4" />
    </Button>
  )
}

export default ToggleDarkLightMode
