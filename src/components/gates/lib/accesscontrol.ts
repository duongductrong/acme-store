import { RoleSchemaType } from "@/schemas/role"

export const generateGrantsListFromPolicies = (
  privileges: any,
  role: string
): Record<"role" | "action" | "resource" | "attributes", string>[] => {
  if (!privileges || !role) return []

  return (privileges as RoleSchemaType["policies"])
    .map((policy) => {
      return policy?.actions?.map((action: string) => {
        return {
          role,
          action,
          resource: policy?.resource,
          attributes: policy.attributes || "*",
        }
      })
    })
    .flat(1)
}
