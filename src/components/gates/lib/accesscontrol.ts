import { RoleSchemaType } from "@/schemas/role"

export const getGrantsFromPrivileges = (
  privileges: any,
  role: string
): Record<"role" | "action" | "resource" | "attributes", string>[] => {
  if (!privileges || !role || !Array.isArray(privileges)) return []

  return (privileges as RoleSchemaType["privileges"])
    .map((privilege) => {
      return privilege?.actions?.map((action: string) => {
        return {
          role,
          action,
          resource: privilege?.resource,
          attributes: privilege.attributes || "*",
        }
      })
    })
    .flat(1)
}
