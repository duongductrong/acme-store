import { getGrantsFromPrivileges } from "@/components/gates/lib/accesscontrol"
import prisma from "@/lib/prisma"
import { TRPCError, initTRPC } from "@trpc/server"
import { AccessControl } from "accesscontrol"
import compact from "lodash/compact"
import SuperJSON from "superjson"
import { ZodError } from "zod"
import { Context, Meta } from "../lib/trpc/context"

const t = initTRPC
  .context<Context>()
  .meta<Meta>()
  .create({
    transformer: SuperJSON,
    errorFormatter(opts) {
      const { shape, error } = opts
      return {
        ...shape,
        data: {
          ...shape.data,
          zodError:
            error.code === "BAD_REQUEST" && error.cause instanceof ZodError
              ? error.cause.flatten()
              : null,
        },
      }
    },
  })

export const permissionsMiddleware = t.middleware(async (opts) => {
  const { ctx, meta, next } = opts

  if (!ctx.session) throw new TRPCError({ code: "UNAUTHORIZED" })

  const currentUserRole = await prisma.role.findFirst({
    where: { id: ctx.session?.user.roleId },
  })

  const resource = meta?.resource as string
  const privileges = currentUserRole?.privileges || []

  const grantsList = getGrantsFromPrivileges(privileges, currentUserRole?.id as string)

  const ac = new AccessControl(compact(grantsList))

  const result = ac
    .can(currentUserRole?.id.toString() as string)
    .resource(resource)
    .read()

  if (!result.granted) throw new TRPCError({ code: "UNAUTHORIZED" })

  return next({ ctx })
})

export const publicProcedure = t.procedure
export const shieldedProcedure = (meta: Meta) => t.procedure.use(permissionsMiddleware).meta(meta)

export const router = t.router
export const middleware = t.middleware
export const mergeRouters = t.mergeRouters
