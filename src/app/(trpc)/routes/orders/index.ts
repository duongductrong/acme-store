import prisma from "@/lib/prisma"
import { shieldedProcedure, router } from "@/app/(trpc)/bootstrap/trpc"
import { RESOURCE_KEYS } from "@/constant/resources"

export const orderShieldedProcedure = shieldedProcedure({
  resource: RESOURCE_KEYS.ORDER,
})

export const orderRouter = router({
  list: orderShieldedProcedure.query(() => {
    return prisma.order.findMany()
  }),
})
