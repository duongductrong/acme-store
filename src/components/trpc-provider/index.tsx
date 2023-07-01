"use client"

import trpc from "@/lib/trpc-client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { getFetch, httpBatchLink, loggerLink } from "@trpc/client"
import { ReactNode, useState } from "react"
import SuperJSON from "superjson"

export interface TrpcProviderProps {
  children: ReactNode
}

const TrpcProvider = ({ children }: TrpcProviderProps) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: { queries: { staleTime: 5000 } },
    })
  })

  const [trpcClient] = useState(() => {
    return trpc.createClient({
      links: [
        loggerLink({
          enabled: () => true,
        }),
        httpBatchLink({
          url: "/api/trpc",
          fetch: async (input, init?) => {
            const fetch = getFetch()

            return fetch(input, {
              ...init,
              credentials: "include",
            })
          },
        }),
      ],
      transformer: SuperJSON,
    })
  })

  return (
    <trpc.Provider queryClient={queryClient} client={trpcClient}>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools />
      </QueryClientProvider>
    </trpc.Provider>
  )
}

export default TrpcProvider
