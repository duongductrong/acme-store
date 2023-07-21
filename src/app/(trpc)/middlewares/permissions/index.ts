import { TRPCError } from "@trpc/server"
import { and, shield } from "trpc-shield"
import { Context } from "../../lib/trpc/context"
import { ensureIsAuthenticated, hasAccessControl } from "./rules"

export const permissions = shield<Context>(
  {
    product: {
      query: {
        list: and(ensureIsAuthenticated, hasAccessControl),
      },
      mutation: {},
    },
  },
  {
    fallbackError: new TRPCError({ code: "UNAUTHORIZED" }),
  }
)
