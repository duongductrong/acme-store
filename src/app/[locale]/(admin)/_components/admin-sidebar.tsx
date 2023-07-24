"use client"

import Link from "@/components/navigations/link"
import TextLegend from "@/components/typography/text-legend"
import { Button } from "@/components/ui/button"
import { getGrantsFromPrivileges } from "@/components/gates/lib/accesscontrol"
import { cn } from "@/lib/utils"
import { Role } from "@prisma/client"
import { AccessControl, Permission, Query } from "accesscontrol"
import { omit } from "lodash"
import { ChevronDown, ChevronsUpDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { Fragment, HTMLAttributes, MouseEvent, useMemo, useState } from "react"
import { ADMIN_SIDEBARS } from "../constants"
import BrandSwitcher from "./brand-switcher"

export interface AdminSidebarProps extends HTMLAttributes<HTMLDivElement> {
  user: {
    role: string
    privileges?: Role["privileges"]
  }
}

const AdminSidebar = ({ className, user, ...props }: AdminSidebarProps) => {
  const pathname = usePathname()
  const [openKeys, setOpenKeys] = useState<Record<string, true>>({})

  const userGrantPrivileges = useMemo(
    () =>
      new AccessControl(getGrantsFromPrivileges(user.privileges, user.role)),
    [user.role, user.privileges]
  )

  const handleToggleOpensItem = (event: MouseEvent<any>, key: string) => {
    event.preventDefault()

    if (openKeys[key]) {
      return setOpenKeys(omit(openKeys, [key]))
    }

    return setOpenKeys(Object.assign({ [key]: true }, openKeys))
  }

  return (
    <div
      {...props}
      className={cn(
        "bg-neutral-100 dark:bg-neutral-900",
        "fixed top-0 left-0 min-w-[250px] h-screen border-r border-neutral-200 dark:border-neutral-800",
        "flex flex-col p-base px-6 gap-base",
        className
      )}
    >
      <BrandSwitcher className="mb-8" />

      {ADMIN_SIDEBARS.map((sidebarItem) => (
        <div key={sidebarItem.id} className="flex flex-col">
          <TextLegend className="mb-base text-neutral-600 dark:!text-neutral-400">
            {sidebarItem.title}
          </TextLegend>
          {sidebarItem.children?.map((sidebarChildrenItem) => {
            const { privilege } = sidebarChildrenItem
            const isActive = pathname.includes(sidebarChildrenItem.id)
            const sidebarChildItemKey = `${sidebarItem.id}_${sidebarChildrenItem.id}`

            const nestedChildItems = sidebarChildrenItem.children || []
            const hasNestedChildItems = !!nestedChildItems.length
            const openNestedChildItemsMenu = openKeys[sidebarChildItemKey]
            const ChevronDownOrUp = openNestedChildItemsMenu
              ? ChevronsUpDown
              : ChevronDown

            const { resource: privilegesResource, actions: privilegesActions } =
              privilege
            const hasGrantedPrivilege = privilegesActions
              .map((action) => {
                const grant = userGrantPrivileges
                  .can(user.role)
                  .resource(privilegesResource)

                try {
                  const permission = grant[action](
                    privilegesResource
                  ) as Permission

                  return permission.granted
                } catch {
                  return false
                }
              })
              .some((hasPrivilege) => hasPrivilege)

            if (!hasGrantedPrivilege) return null

            return (
              <Fragment key={sidebarChildItemKey}>
                <Button
                  // key={sidebarChildItemKey}
                  variant="ghost"
                  className={cn(
                    "justify-start h-9 hover:bg-transparent px-0 relative",
                    [
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground font-normal",
                    ]
                  )}
                  asChild
                >
                  <Link href={sidebarChildrenItem.link ?? "/"}>
                    {sidebarChildrenItem.Icon && (
                      <sidebarChildrenItem.Icon className="w-4 h-4 mr-base" />
                    )}
                    {sidebarChildrenItem.title}
                    {hasNestedChildItems ? (
                      <Button
                        variant="ghost"
                        size="icon"
                        className={cn(
                          "absolute top-1/2 right-0 transform -translate-y-1/2",
                          "flex items-center justify-center"
                        )}
                        onClick={(event) =>
                          handleToggleOpensItem(event, sidebarChildItemKey)
                        }
                      >
                        <ChevronDownOrUp className={cn("w-4 h-4", "z-10")} />
                      </Button>
                    ) : null}
                  </Link>
                </Button>
                {nestedChildItems.length && openNestedChildItemsMenu ? (
                  <div>
                    {nestedChildItems.map((nestedChildItem) => {
                      const isNestedChildItemActive = pathname.includes(
                        nestedChildItem.link
                      )
                      const nestedChildItemKey = `${sidebarItem.id}_${sidebarChildrenItem.id}_${nestedChildItem.id}`

                      return (
                        <Button
                          key={nestedChildItemKey}
                          variant="ghost"
                          className={cn(
                            "justify-start h-9 hover:bg-transparent ml-2 px-0 text-[13px]",
                            [
                              isNestedChildItemActive
                                ? "text-foreground font-medium"
                                : "text-neutral-600 dark:text-neutral-400 font-normal",
                            ]
                          )}
                          asChild
                        >
                          <Link href={nestedChildItem.link ?? "/"}>
                            {nestedChildItem.Icon && (
                              <nestedChildItem.Icon className="w-4 h-4 mr-2" />
                            )}
                            {nestedChildItem.title}
                          </Link>
                        </Button>
                      )
                    })}
                  </div>
                ) : null}
              </Fragment>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default AdminSidebar
