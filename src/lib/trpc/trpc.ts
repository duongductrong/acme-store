import { TRPCError, initTRPC } from "@trpc/server"
import SuperJSON from "superjson"
import { Context } from "./context"

const t = initTRPC.context<Context>().create({
  transformer: SuperJSON,
})

/**
 * @middleware
 * Contains many middleware to apply for procedure
 */
export const ensureIsAuthenticated = t.middleware(({ next, ctx }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" })
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  })
})

// /@middleware

// @exports
export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(ensureIsAuthenticated)
export const middleware = t.middleware
export const mergeRouters = t.mergeRouters
