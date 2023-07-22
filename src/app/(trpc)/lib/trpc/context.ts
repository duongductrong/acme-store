import { inferAsyncReturnType } from "@trpc/server"
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch"
import { AuthOptions, Session, getServerSession } from "next-auth"
import { NextAuthSession, authOptions } from "../../../../lib/next-auth"

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async (ctx: FetchCreateContextFnOptions) => {
  const session = await getServerSession<
    AuthOptions,
    Session & NextAuthSession
  >(authOptions)

  return {
    session,
  }
}

export type Context = inferAsyncReturnType<typeof createContext>
export interface Meta {
  resource: string
}
