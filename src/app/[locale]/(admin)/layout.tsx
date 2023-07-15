import Link from "@/components/navigations/link"
import TextLegend from "@/components/typography/text-legend"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import dynamic from "next/dynamic"
import BranchSwitcher from "./components/brand-switcher"
import { ADMIN_SIDEBARS } from "./constants"

const ToggleDarkLightMode = dynamic(
  () => import("@/components/toggle-darklight-mode"),
  { ssr: false }
)

export const revalidate = false

export interface AdminLayoutProps extends CommonLayoutProps {}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      <div className="h-[64px] border-b dark:border-neutral-800 bg-white dark:bg-neutral-950 sticky top-0 z-10">
        <div className="flex items-center w-full h-full px-base">
          <div className="flex items-center h-full gap-base">
            <Menu className="w-5 h-5" />
            <BranchSwitcher />
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
      </div>
      <div className="flex">
        <div
          className={cn(
            "fixed top-[64px] left-0 min-w-[240px] h-[calc(100vh-64px)] border-r border-neutral-200 dark:border-neutral-800",
            "flex flex-col p-base gap-base"
          )}
        >
          {ADMIN_SIDEBARS.map((sidebarItem) => (
            <div key={sidebarItem.id} className="flex flex-col">
              <TextLegend className="mb-base">{sidebarItem.title}</TextLegend>
              {sidebarItem.children.map((sidebarChildrenItem) => (
                <Button
                  key={`${sidebarItem.id}_${sidebarChildrenItem.id}`}
                  variant="ghost"
                  className="justify-start"
                  asChild
                >
                  <Link href={sidebarChildrenItem.link ?? "/"}>
                    <sidebarChildrenItem.Icon className="w-4 h-4 mr-base" />
                    {sidebarChildrenItem.title}
                  </Link>
                </Button>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full ml-[240px] px-6 py-8 bg-neutral-50 dark:bg-black min-h-[calc(100vh-64px)]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
