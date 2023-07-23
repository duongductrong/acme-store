import { NextAuthSession } from "@/lib/next-auth"
import "next-auth"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: NextAuthSession["user"]
  }
}
