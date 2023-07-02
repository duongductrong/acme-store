import { TRPCError, initTRPC } from "@trpc/server"
import SuperJSON from "superjson"

const t = initTRPC.create({
  transformer: SuperJSON,
})

const isAuth = t.middleware((opts) => {
  throw new TRPCError({ code: "UNAUTHORIZED" })

  return opts.next({
    ctx: {
      user: {},
    },
  })
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(isAuth)
export const middleware = t.middleware
export const mergeRouters = t.mergeRouters
