import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import dynamic from "next/dynamic"
import { HTMLAttributes } from "react"

const ToggleDarkLightMode = dynamic(
  () => import("@/components/toggle-darklight-mode"),
  { ssr: false }
)

export interface AdminNavigationBarProps extends HTMLAttributes<HTMLElement> {}

const AdminNavigationBar = ({
  className,
  ...props
}: AdminNavigationBarProps) => {
  return (
    <header
      {...props}
      className={cn(
        "h-[64px] border-b dark:border-zinc-800 bg-white dark:bg-zinc-950 sticky top-0 z-10",
        className
      )}
    >
      <div className="flex items-center w-full h-full px-base">
        <div className="flex items-center h-full gap-base">
          <Menu className="w-5 h-5" />
        </div>

        <div className="flex items-center gap-base ml-auto">
          <Input placeholder="Search products..." className="min-w-[250px]" />
          <ToggleDarkLightMode />
          <Avatar className="w-9 h-9">
            <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
            <AvatarFallback />
          </Avatar>
        </div>
      </div>
    </header>
  )
}

export default AdminNavigationBar
