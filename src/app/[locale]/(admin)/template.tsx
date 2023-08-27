"use client"

import Gate, { GatePrivilege } from "@/components/gates/gate"
import Text from "@/components/typography/text"
import { SITE_RESOURCES } from "@/constant/resources"
import { Ban } from "lucide-react"
import { usePathname } from "next/navigation"

export interface AdminTemplateProps extends CommonLayoutProps {}

const AdminTemplate = ({ children }: AdminTemplateProps) => {
  const resources = SITE_RESOURCES
  const pathname = usePathname()

  // if (!new RegExp("^(/admin/)(.+)").test(pathname)) return "Loading..."

  const getPathRegexPattern = (path: string) => {
    const regexPattern = new RegExp(path.replace(/{id}/g, "([^/]+)").replace(/\//g, "\\/") + "$")
    return regexPattern
  }

  const currentResourceFromPathname = resources.find((resource) => {
    const pathnames = Object.keys(resource.paths)
    const isEqualPathname = pathnames.find((_pathname) =>
      getPathRegexPattern(_pathname).test(pathname)
    )
    return isEqualPathname
  })

  if (!currentResourceFromPathname) throw new Error("Resource not found in this pathname.")

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
      resource={currentResourceFromPathname.key}
      privileges={Object.keys(currentPrivileges) as Array<GatePrivilege>}
      forbidden={
        <div className="w-full h-[500px] flex flex-col items-center justify-center">
          <Ban className="w-10 h-10 mb-4" />
          <Text className="text-2xl mb-2">Forbidden.</Text>
          <Text className="text-muted-foreground">You have restricted access.</Text>
        </div>
      }
    >
      {children}
    </Gate>
  )
}

export default AdminTemplate
