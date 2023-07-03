import { AppRouter } from "@/app/api/(trpc)/trpc-router"
import { createTRPCReact } from "@trpc/react-query"

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

export default trpc
