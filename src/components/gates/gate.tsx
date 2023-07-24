// [] Made gate with privileges for an action or a layout.

import { getGrantsFromPrivileges } from "@/components/gates/lib/accesscontrol"
import { AccessControl, Permission, Query } from "accesscontrol"
import { ReactNode, useMemo } from "react"
import { useGate } from "./hooks/use-gate"

export type GatePrivilege =
  | "read"
  | "read:any"
  | "read:own"
  | "create"
  | "create:any"
  | "create:own"
  | "update"
  | "update:any"
  | "update:own"
  | "delete"
  | "delete:any"
  | "delete:own"

export type GateGrantShape = Record<
  "role" | "action" | "resource" | "attributes",
  string
>

export type GateProps = {
  /**
   * the resource wrapper
   */
  resource: string
  /**
   * The resource privileges
   */
  privileges: GatePrivilege[]
  /**
   * The user's grants
   */
  forbidden?: ReactNode
  children: ReactNode
}

export const gatePrivileges: Record<GatePrivilege, keyof Query> = {
  read: "read",
  "read:any": "readAny",
  "read:own": "readOwn",

  create: "create",
  "create:any": "createAny",
  "create:own": "createOwn",

  update: "update",
  "update:any": "updateAny",
  "update:own": "updateOwn",

  delete: "delete",
  "delete:any": "deleteAny",
  "delete:own": "deleteOwn",
}

/**
 * Gates are most applicable to actions that are not related to any model or resource,
 * such as viewing an administrator dashboard
 */
const Gate = ({ children, forbidden, privileges, resource }: GateProps) => {
  const gate = useGate()

  const userGrantPrivilege = useMemo(() => {
    return new AccessControl(gate.grants)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gate.grants])

  const hasGranted = privileges
    .map((privilege) => {
      const privilegeInAccessControl = gatePrivileges[privilege]
      const role = userGrantPrivilege.can(gate.role as string)
      const resourceOwn = role.resource(resource)
      
      try {
        const permission = resourceOwn[privilegeInAccessControl](
          resource
        ) as Permission
  
        return permission.granted
      } catch {
        return false
      }
    })
    .some((granted) => granted)

  return hasGranted ? children : forbidden ? forbidden : null
}

export default Gate
