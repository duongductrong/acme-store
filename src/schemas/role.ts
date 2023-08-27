import { VALIDATION_MESSAGES } from "@/constant/messages"
import { RoleScope } from "@prisma/client"
import { z } from "zod"

export const roleSchema = z.object({
  id: z.string().nullish(),
  name: z
    .string({ required_error: VALIDATION_MESSAGES.REQUIRED("Name") })
    .min(1, VALIDATION_MESSAGES.REQUIRED("Name")),
  description: z.string().nullish(),
  privileges: z.array(
    z
      .object({
        resource: z.string().nullish(),
        actions: z.array(z.string().nullish()).or(z.record(z.any(), z.any())).nullish(),
        attributes: z.array(z.string().nullish()).nullish(),
      })
      .nullish()
  ),
  scope: z.string().refine((scopeValue) => {
    if (![RoleScope.Admin, RoleScope.Storefront].includes(scopeValue as RoleScope)) {
      return false
    }

    return true
  }, VALIDATION_MESSAGES.NOT_EXISTS("Scope")),
})

export type RoleSchemaType = z.infer<typeof roleSchema>
