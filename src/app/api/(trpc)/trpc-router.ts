import { router } from "@/lib/trpc"
import { productRouter } from "./routes/products"
import { categoryRouter } from "./routes/categories"
import { collectionRouter } from "./routes/collections"

export const appRouter = router({
  product: productRouter,
  category: categoryRouter,
  collection: collectionRouter,
})

export type AppRouter = typeof appRouter
