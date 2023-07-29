"use client"

import { Link } from "@/components/assistant-router"
import { getGrantsFromPrivileges } from "@/components/gates/lib/accesscontrol"
import TextLegend from "@/components/typography/text-legend"
import { Button } from "@/components/ui/button"
import ListGroup from "@/components/ui/list/list-group"
import ListItem from "@/components/ui/list/list-item"
import ListRoot from "@/components/ui/list/list-root"
import ListSubItem from "@/components/ui/list/list-sub-item"
import { cn } from "@/lib/utils"
import { Role } from "@prisma/client"
import { AccessControl, Permission } from "accesscontrol"
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
    <ListRoot
      {...props}
      className={cn(
        "fixed top-0 left-0 min-w-[250px] h-screen border-r border-zinc-200 dark:border-zinc-800",
        className
      )}
    >
      <BrandSwitcher className="mb-8" />

      {ADMIN_SIDEBARS.map((sidebarItem) => (
        <ListGroup key={sidebarItem.id}>
          <TextLegend className="mb-base text-zinc-600 dark:!text-zinc-400">
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
                <ListItem active={isActive} asChild>
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
                          "absolute top-1/2 right-2 transform -translate-y-1/2",
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
                </ListItem>
                {nestedChildItems.length && openNestedChildItemsMenu ? (
                  <ListGroup>
                    {nestedChildItems.map((nestedChildItem) => {
                      const isNestedChildItemActive = pathname.includes(
                        nestedChildItem.link
                      )
                      const nestedChildItemKey = `${sidebarItem.id}_${sidebarChildrenItem.id}_${nestedChildItem.id}`

                      return (
                        <ListSubItem
                          key={nestedChildItemKey}
                          active={isNestedChildItemActive}
                          asChild
                        >
                          <Link href={nestedChildItem.link ?? "/"}>
                            {nestedChildItem.Icon && (
                              <nestedChildItem.Icon className="w-4 h-4 mr-2" />
                            )}
                            {nestedChildItem.title}
                          </Link>
                        </ListSubItem>
                      )
                    })}
                  </ListGroup>
                ) : null}
              </Fragment>
            )
          })}
        </ListGroup>
      ))}
    </ListRoot>
  )
}

export default AdminSidebar
