import { fetchRequestHandler } from "@trpc/server/adapters/fetch"
import { appRouter } from "../../trpc-router"

const handler = (req: Request) => {
  console.log("request from", req.url)

  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: () => ({}),
    batching: {
      enabled: true,
    },
  })
}

export { handler as GET, handler as POST }
