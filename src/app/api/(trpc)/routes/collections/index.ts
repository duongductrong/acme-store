import prisma from "@/lib/prisma"
import { publicProcedure, router } from "@/lib/trpc/trpc"
import { collectionSchema } from "@/schemas/collection"
import {
  infiniteLoaderSchema,
  outputInfiniteLoaderSchema,
} from "@/schemas/infinite"
import { z } from "zod"

export const collectionRouter = router({
  list: publicProcedure
    .input(infiniteLoaderSchema)
    .output(outputInfiniteLoaderSchema)
    .query(async ({ input }) => {
      const { cursor, search } = input
      const limit = Number(input.limit) ?? 10

      const items = await prisma.collection.findMany({
        take: Number(limit) + 1,
        where: {
          name: {
            contains: search ?? "",
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
      })

      let nextCursor: typeof cursor | undefined = undefined
      if (items.length > limit) {
        const nextItem = items.pop()
        nextCursor = nextItem!.id
      }

      return {
        items,
        nextCursor,
      }
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
