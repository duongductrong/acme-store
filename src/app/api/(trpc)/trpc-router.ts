import { router } from "@/lib/trpc"
import { productRouter } from "./routes/products"
import { categoryRouter } from "./routes/categories"

export const appRouter = router({
  product: productRouter,
  category: categoryRouter,
})

export type AppRouter = typeof appRouter
