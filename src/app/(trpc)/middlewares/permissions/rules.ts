import { rule } from "trpc-shield"
import { Context } from "../../lib/trpc/context"

export const ensureIsAuthenticated = rule<Context>()(
  async (ctx, type, path, input, rawInput) => {
    return ctx.session?.user !== null
  }
)

export const hasAccessControl = rule<Context>()(async (ctx) => {
  // console.log(ctx.session?.user)
  // return !!ctx.session?.user
  return true
})
