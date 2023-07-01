import prisma from "@/lib/prisma"
import { publicProcedure, router } from "@/lib/trpc"
import { z } from "zod"

export const productRouter = router({
  list: publicProcedure.query(() => {
    return prisma.product.findMany()
  }),
  create: publicProcedure.input(z.object({})).mutation((inputs) => {
    console.log(inputs.input)
    return inputs
  }),
})
