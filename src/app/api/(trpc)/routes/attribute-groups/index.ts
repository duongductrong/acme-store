import prisma from "@/lib/prisma"
import { publicProcedure, router } from "@/lib/trpc"
import { attributeGroupSchema } from "@/schemas/attribute-group"
import { z } from "zod"

export const attributeGroupRouter = router({
  list: publicProcedure.query(() => {
    return prisma.productAttributeGroup.findMany()
  }),

  detail: publicProcedure.input(z.string()).query(({ input: id }) => {
    return prisma.productAttributeGroup.findFirst({ where: { id } })
  }),

  create: publicProcedure
    .input(attributeGroupSchema)
    .mutation(async ({ input }) => {
      return prisma.productAttributeGroup.create({ data: { name: input.name } })
    }),
  update: publicProcedure
    .input(z.object({ id: z.string() }).extend(attributeGroupSchema.shape))
    .mutation(({ input }) => {
      return prisma.productAttributeGroup.update({
        where: {
          id: input.id?.toString(),
        },
        data: {
          name: input.name,
        },
      })
    }),
  permanentlyDelete: publicProcedure
    .input(z.string())
    .mutation(({ input: id }) => {
      return prisma.productAttributeGroup.delete({ where: { id } })
    }),
})
