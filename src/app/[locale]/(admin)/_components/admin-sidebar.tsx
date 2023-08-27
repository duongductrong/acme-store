"use client"

import { Link } from "@/components/router"
import { getGrantsFromPrivileges } from "@/components/gates/lib/accesscontrol"
import TextLegend from "@/components/typography/text-legend"
import { Button } from "@/components/ui/button"
import ListCollapse from "@/components/ui/list/list-collapse"
import ListItem from "@/components/ui/list/list-item"
import ListRoot from "@/components/ui/list/list-root"
import { cn } from "@/lib/utils"
import { Role } from "@prisma/client"
import { AccessControl, Permission } from "accesscontrol"
import { omit } from "lodash"
import { ChevronDown, ChevronsUpDown } from "lucide-react"
import { usePathname } from "next/navigation"
import { Fragment, HTMLAttributes, MouseEvent, useMemo, useState } from "react"
import { ADMIN_SIDEBARS } from "../constants"
import AdminBrand from "./admin-brand"
import AdminProfile from "./admin-profile"

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
    () => new AccessControl(getGrantsFromPrivileges(user.privileges, user.role)),
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
    <ListRoot
      {...props}
      className={cn(
        "fixed top-0 left-0 min-w-[250px] h-screen border-r border-zinc-200",
        "dark:border-zinc-800 bg-asidebar-background",
        className
      )}
    >
      <AdminBrand className="mb-6" />

      {ADMIN_SIDEBARS.map((sidebarItem) => (
        <div key={sidebarItem.id}>
          <TextLegend className="mb-base text-asidebar-foreground">{sidebarItem.title}</TextLegend>
          {sidebarItem.children?.map((sidebarChildrenItem) => {
            const { privilege } = sidebarChildrenItem
            const isActive = pathname.includes(sidebarChildrenItem.id)
            const sidebarChildItemKey = `${sidebarItem.id}_${sidebarChildrenItem.id}`

            const nestedChildItems = sidebarChildrenItem.children || []
            const hasNestedChildItems = !!nestedChildItems.length
            const openNestedChildItemsMenu = openKeys[sidebarChildItemKey]
            const ChevronDownOrUp = openNestedChildItemsMenu ? ChevronsUpDown : ChevronDown

            const { resource: privilegesResource, actions: privilegesActions } = privilege
            const hasGrantedPrivilege = privilegesActions
              .map((action) => {
                const grant = userGrantPrivileges.can(user.role).resource(privilegesResource)

                try {
                  const permission = grant[action](privilegesResource) as Permission

                  return permission.granted
                } catch {
                  return false
                }
              })
              .some((hasPrivilege) => hasPrivilege)

            if (!hasGrantedPrivilege) return null

            return (
              <Fragment key={sidebarChildItemKey}>
                <ListItem
                  as={Link}
                  prefixIcon={sidebarChildrenItem.Icon}
                  hover={false}
                  active={isActive}
                  href={sidebarChildrenItem.link ?? "/"}
                  className={cn(
                    "text-asidebar-foreground hover:text-white",
                    isActive ? "text-white bg-primary" : null
                  )}
                >
                  {sidebarChildrenItem.title}
                  {hasNestedChildItems ? (
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn(
                        "absolute top-1/2 right-2 transform -translate-y-1/2",
                        "flex items-center justify-center"
                      )}
                      onClick={(event) => handleToggleOpensItem(event, sidebarChildItemKey)}
                    >
                      <ChevronDownOrUp className={cn("w-4 h-4", "z-10")} />
                    </Button>
                  ) : null}
                </ListItem>
                {nestedChildItems.length && openNestedChildItemsMenu ? (
                  <ListCollapse>
                    {nestedChildItems.map((nestedChildItem) => {
                      const isNestedChildItemActive = pathname.includes(nestedChildItem.link)
                      const nestedChildItemKey = `${sidebarItem.id}_${sidebarChildrenItem.id}_${nestedChildItem.id}`

                      return (
                        <ListItem
                          key={nestedChildItemKey}
                          active={isNestedChildItemActive}
                          as={Link}
                          href={nestedChildItem.link ?? "/"}
                          className={cn(
                            "text-[13px] text-asidebar-foreground hover:text-white hover:bg-transparent",
                            isActive ? "text-white bg-transparent" : null
                          )}
                          prefixIcon={nestedChildItem.Icon}
                        >
                          {nestedChildItem.title}
                        </ListItem>
                      )
                    })}
                  </ListCollapse>
                ) : null}
              </Fragment>
            )
          })}
        </div>
      ))}

      <AdminProfile
        name="Jonathon Treat"
        email="jonathontreat@gmail.com"
        src="https://github.com/shadcn.png"
        className="mt-auto"
      />
    </ListRoot>
  )
}

export default AdminSidebar
