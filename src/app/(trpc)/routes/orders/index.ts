import prisma from "@/lib/prisma"
import { shieldedProcedure, router } from "@/app/(trpc)/lib/trpc/trpc"

export const orderRouter = router({
  list: shieldedProcedure.query(() => {
    return prisma.order.findMany()
  }),
})
