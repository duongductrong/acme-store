"use client"

import Link from "@/components/navigations/link"
import TextLegend from "@/components/typography/text-legend"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { ADMIN_SIDEBARS } from "../constants"
import BrandSwitcher from "./brand-switcher"
import { HTMLAttributes } from "react"

export interface AdminSidebarProps extends HTMLAttributes<HTMLDivElement> {}

const AdminSidebar = ({ className, ...props }: AdminSidebarProps) => {
  const pathname = usePathname()

  return (
    <div
      {...props}
      className={cn(
        "fixed top-0 left-0 min-w-[240px] h-[calc(100vh-64px)] border-r border-neutral-200 dark:border-neutral-800",
        "flex flex-col p-base gap-base",
        className
      )}
    >
      <BrandSwitcher className="mb-8" />

      {ADMIN_SIDEBARS.map((sidebarItem, sidebarIndex) => (
        <div key={sidebarItem.id} className="flex flex-col">
          <TextLegend className="mb-base text-neutral-600 dark:!text-neutral-400">
            {sidebarItem.title}
          </TextLegend>
          {sidebarItem.children.map((sidebarChildrenItem, itemIndex) => {
            const isActive = pathname.includes(sidebarChildrenItem.id)

            return (
              <Button
                key={`${sidebarItem.id}_${sidebarChildrenItem.id}`}
                variant="ghost"
                className={cn("justify-start h-9 hover:bg-transparent", [
                  isActive
                    ? "text-foreground font-medium"
                    : "text-neutral-600 dark:text-neutral-400 font-normal",
                ])}
                asChild
              >
                <Link href={sidebarChildrenItem.link ?? "/"}>
                  <sidebarChildrenItem.Icon className="w-4 h-4 mr-base" />
                  {sidebarChildrenItem.title}
                </Link>
              </Button>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default AdminSidebar
