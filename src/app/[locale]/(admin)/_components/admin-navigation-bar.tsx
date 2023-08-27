import { Link } from "@/components/router"
import { Button } from "@/components/ui/button"
import { STORE_FRONT_URL } from "@/constant/urls"
import { cn } from "@/lib/utils"
import { Bell } from "lucide-react"
import dynamic from "next/dynamic"
import { HTMLAttributes } from "react"

const ToggleDarkLightMode = dynamic(() => import("@/components/toggle-darklight-mode"), {
  ssr: false,
})

export interface AdminNavigationBarProps extends HTMLAttributes<HTMLElement> {}

const AdminNavigationBar = ({ className, ...props }: AdminNavigationBarProps) => {
  return (
    <header {...props} className={cn("h-[64px] sticky top-0 z-10", className)}>
      <div className="flex items-center w-full h-full px-base">
        <div className="flex items-center gap-6 ml-auto">
          <ToggleDarkLightMode />
          <Bell className="w-4 h-4 cursor-pointer" />
          {/* <Avatar className="w-9 h-9">
            <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
            <AvatarFallback />
          </Avatar> */}
          <Button variant="outline">
            <Link href={STORE_FRONT_URL.HOME}>View shop</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

export default AdminNavigationBar
