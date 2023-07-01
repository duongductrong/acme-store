import prisma from "@/lib/prisma"
import { publicProcedure, router } from "@/lib/trpc"

export const productRouter = router({
  list: publicProcedure.query(() => {
    return prisma.product.create({
      data: {
        id: "",
        productName: "Product A",
        SKU: "ProducTasd",
        slug: "productasd",
      },
    })
    // return prisma.product.findMany()
  }),
})
