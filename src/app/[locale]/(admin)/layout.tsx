import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import clsx from "clsx"
import { Menu } from "lucide-react"
import Link from "next/link"
import BranchSwitcher from "./components/brand-switcher"
import { ADMIN_SIDEBARS } from "./constants"

export interface AdminLayoutProps extends CommonLayoutProps {}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      <div className="h-[64px] border-b dark:border-neutral-800 bg-white sticky top-0">
        <div className="flex items-center w-full h-full px-4">
          <div className="flex items-center h-full gap-4">
            <Menu className="w-5 h-5" />
            <BranchSwitcher />
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <Input placeholder="Search products..." className="min-w-[250px]" />
            <Avatar className="w-9 h-9">
              <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
              <AvatarFallback />
            </Avatar>
          </div>
        </div>
      </div>
      <div className="flex">
        <div
          className={clsx(
            "fixed top-[64px] left-0 min-w-[240px] h-screen border-r border-neutral-200 dark:border-neutral-800",
            "flex flex-col p-4 gap-4"
          )}
        >
          {ADMIN_SIDEBARS.map((sidebarItem) => (
            <div key={sidebarItem.id} className="flex flex-col">
              <span className="text-xs font-bold uppercase text-neutral-700 dark:text-neutral-300 mb-4">
                {sidebarItem.title}
              </span>
              {sidebarItem.children.map((sidebarChildrenItem) => (
                <Button
                  key={`${sidebarItem.id}_${sidebarChildrenItem.id}`}
                  variant="ghost"
                  className="justify-start"
                  asChild
                >
                  <Link href={sidebarChildrenItem.link ?? "/"}>
                    <sidebarChildrenItem.Icon className="w-4 h-4 mr-4" />
                    {sidebarChildrenItem.title}
                  </Link>
                </Button>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full ml-[240px] px-4 py-8 bg-neutral-50">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
