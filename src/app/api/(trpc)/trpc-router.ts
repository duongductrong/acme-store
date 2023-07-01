import { router } from "@/lib/trpc"
import { productRouter } from "./routes/products"

export const appRouter = router({
  product: productRouter,
})

export type AppRouter = typeof appRouter
