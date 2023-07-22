import { router, shieldedProcedure } from "@/app/(trpc)/bootstrap/trpc"
import { RESOURCE_KEYS } from "@/constant/resources"
import prisma from "@/lib/prisma"
import { attributeGroupSchema } from "@/schemas/attribute-group"
import { z } from "zod"

export const attributeGroupShieldedProcedure = shieldedProcedure({
  resource: RESOURCE_KEYS.ATTRIBUTE_GROUP,
})

export const attributeGroupRouter = router({
  list: attributeGroupShieldedProcedure.query(({ input }) => {
    return prisma.productAttributeGroup.findMany()
  }),

  detail: attributeGroupShieldedProcedure
    .input(z.string())
    .query(({ input: id }) => {
      return prisma.productAttributeGroup.findFirst({ where: { id } })
    }),

  create: attributeGroupShieldedProcedure
    .input(attributeGroupSchema)
    .mutation(async ({ input }) => {
      return prisma.productAttributeGroup.create({ data: { name: input.name } })
    }),
  update: attributeGroupShieldedProcedure
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
  permanentlyDelete: attributeGroupShieldedProcedure
    .input(z.string())
    .mutation(({ input: id }) => {
      return prisma.productAttributeGroup.delete({ where: { id } })
    }),
})
