import { createContext } from "@/app/(trpc)/lib/trpc/context"
import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "@/app/(trpc)/app-router"

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    batching: {
      enabled: true,
    },
    createContext,
  })
}

export { handler as GET, handler as POST }
