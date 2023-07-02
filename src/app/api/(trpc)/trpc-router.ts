import { router } from "@/lib/trpc"
import { productRouter } from "./routes/products"
import { categoryRouter } from "./routes/categories"
import { collectionRouter } from "./routes/collections"
import { attributeRouter } from "./routes/attributes"
import { attributeGroupRouter } from "./routes/attribute-groups"
import { customerRouter } from "./routes/customers"
import { orderRouter } from "./routes/orders"

export const appRouter = router({
  product: productRouter,
  category: categoryRouter,
  collection: collectionRouter,
  attribute: attributeRouter,
  attributeGroup: attributeGroupRouter,
  customer: customerRouter,
  order: orderRouter,
})

export type AppRouter = typeof appRouter
