import { AppRouter } from "@/app/(trpc)/types"
import {
  createTRPCProxyClient,
  createTRPCReact,
  httpBatchLink,
} from "@trpc/react-query"
import SuperJSON from "superjson"

// function getBaseUrl() {
//   if (typeof window !== "undefined")
//     // browser should use relative path
//     return ""
//   if (process.env.VERCEL_URL)
//     // reference for vercel.com
//     return `https://${process.env.VERCEL_URL}`
//   if (process.env.RENDER_INTERNAL_HOSTNAME)
//     // reference for render.com
//     return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`
//   // assume localhost
//   return `http://localhost:${process.env.PORT ?? 3000}`
// }

const trpc = createTRPCReact<AppRouter>()

const trpcProxy = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
  transformer: SuperJSON,
})

// const trpc = createTRPCNext<AppRouter>({
//   ssr: false,
//   config: () => {
//     return {
//       links: [
//         loggerLink({
//           enabled: () => true,
//         }),
//         httpBatchLink({
//           url: `${getBaseUrl()}/api/trpc/`,
//           fetch: async (input, init?) => {
//             const fetch = getFetch()
//             return fetch(input, {
//               ...init,
//               credentials: "include",
//             })
//           },
//         }),
//       ],
//       transformer: SuperJSON,
//     }
//   },
// })

export { trpcProxy }

export default trpc
