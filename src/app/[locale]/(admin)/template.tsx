"use client"

import Gate, { GatePrivilege } from "@/components/gates/gate"
import { generateGrantsListFromPolicies } from "@/components/gates/lib/accesscontrol"
import { SITE_RESOURCES } from "@/constant/resources"
import { usePathname } from "next/navigation"
import { useAdmin } from "./_providers/admin-provider/hooks"

export interface AdminTemplateProps extends CommonLayoutProps {}

const AdminTemplate = ({ children }: AdminTemplateProps) => {
  const resources = SITE_RESOURCES
  const pathname = usePathname()
  const { grants } = useAdmin()

  const getPathRegexPattern = (path: string) => {
    const regexPattern = new RegExp(
      path.replace(/{id}/g, "([^/]+)").replace(/\//g, "\\/") + "$"
    )
    return regexPattern
  }

  const currentResourceFromPathname = resources.find((resource) => {
    const pathnames = Object.keys(resource.paths)
    const isEqualPathname = pathnames.find((_pathname) =>
      getPathRegexPattern(_pathname).test(pathname)
    )
    return isEqualPathname
  })

  if (!currentResourceFromPathname)
    throw new Error("Resource not found in this pathname.")

  const pathnameEntities = Object.entries(currentResourceFromPathname.paths)
  const pathnameEntity = pathnameEntities.find(([pathPattern]) =>
    getPathRegexPattern(pathPattern).test(pathname)
  )
  const currentPrivileges = pathnameEntity?.[1].privileges ?? []
  // console.log({
  //   grants,
  //   resource: currentResourceFromPathname.key,
  //   privileges: Object.keys(currentPrivileges),
  // })
  return (
    <Gate
      grants={grants}
      resource={currentResourceFromPathname.key}
      privileges={Object.keys(currentPrivileges) as Array<GatePrivilege>}
    >
      {children}
    </Gate>
  )
}

export default AdminTemplate
