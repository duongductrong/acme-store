import prisma from "@/lib/prisma"
import { shieldedProcedure, router } from "@/app/(trpc)/lib/trpc/trpc"
import { attributeGroupSchema } from "@/schemas/attribute-group"
import { z } from "zod"

export const attributeGroupRouter = router({
  list: shieldedProcedure.query(() => {
    return prisma.productAttributeGroup.findMany()
  }),

  detail: shieldedProcedure.input(z.string()).query(({ input: id }) => {
    return prisma.productAttributeGroup.findFirst({ where: { id } })
  }),

  create: shieldedProcedure
    .input(attributeGroupSchema)
    .mutation(async ({ input }) => {
      return prisma.productAttributeGroup.create({ data: { name: input.name } })
    }),
  update: shieldedProcedure
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
  permanentlyDelete: shieldedProcedure
    .input(z.string())
    .mutation(({ input: id }) => {
      return prisma.productAttributeGroup.delete({ where: { id } })
    }),
})
