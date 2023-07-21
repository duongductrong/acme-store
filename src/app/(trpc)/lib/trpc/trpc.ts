import { initTRPC } from "@trpc/server"
import SuperJSON from "superjson"
import { ZodError } from "zod"
import { permissions } from "../../middlewares/permissions"
import { Context } from "./context"

const t = initTRPC.context<Context>().create({
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

export const publicProcedure = t.procedure
export const permissionsMiddleware = t.middleware(permissions as any)
export const shieldedProcedure = t.procedure.use(permissionsMiddleware)

export const router = t.router
export const middleware = t.middleware
export const mergeRouters = t.mergeRouters
