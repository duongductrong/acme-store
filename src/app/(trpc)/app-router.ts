import { router } from "@/app/(trpc)/bootstrap/trpc"
import { inferRouterInputs, inferRouterOutputs } from "@trpc/server"
import { attributeGroupRouter } from "./routes/attribute-groups"
import { attributeRouter } from "./routes/attributes"
import { authRouter } from "./routes/auth"
import { categoryRouter } from "./routes/categories"
import { collectionRouter } from "./routes/collections"
import { customerRouter } from "./routes/customers"
import { orderRouter } from "./routes/orders"
import { productRouter } from "./routes/products"
import { roleRouter } from "./routes/roles"

export const appRouter = router({
  product: productRouter,
  category: categoryRouter,
  collection: collectionRouter,
  attribute: attributeRouter,
  attributeGroup: attributeGroupRouter,
  customer: customerRouter,
  order: orderRouter,
  auth: authRouter,
  role: roleRouter,
})

export type AppRouter = typeof appRouter
export type RouterInput = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
