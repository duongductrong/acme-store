import prisma from "@/lib/prisma"
import { publicProcedure, router } from "@/lib/trpc/trpc"
import { collectionSchema } from "@/schemas/collection"
import { z } from "zod"

export const collectionRouter = router({
  list: publicProcedure.query(() => {
    return prisma.collection.findMany()
  }),

  detail: publicProcedure
    .input(
      z
        .number()
        .or(z.string())
        .transform((v) => Number(v))
    )
    .query(({ input: id }) => {
      return prisma.collection.findFirst({ where: { id } })
    }),

  create: publicProcedure
    .input(collectionSchema)
    .mutation(async ({ input }) => {
      return prisma.collection.create({
        data: {
          code: input.code,
          name: input.name,
          description: input.description,
        },
      })
    }),

  update: publicProcedure
    .input(z.object({ id: z.number() }).extend(collectionSchema.shape))
    .mutation(({ input }) => {
      return prisma.collection.update({
        where: {
          id: input.id as unknown as number,
        },
        data: {
          code: input.code,
          name: input.name,
          description: input.description,
        },
      })
    }),

  permanentlyDelete: publicProcedure
    .input(z.number())
    .mutation(({ input: id }) => {
      return prisma.collection.delete({ where: { id } })
    }),
})
