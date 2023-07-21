import prisma from "@/lib/prisma"
import { publicProcedure, router } from "@/app/(trpc)/lib/trpc/trpc"

export const orderRouter = router({
  list: publicProcedure.query(() => {
    return prisma.order.findMany()
  }),
})
