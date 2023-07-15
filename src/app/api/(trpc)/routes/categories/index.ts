import prisma from "@/lib/prisma"
import { publicProcedure, router } from "@/lib/trpc/trpc"
import { categorySchema } from "@/schemas/category"
import {
  infiniteLoaderSchema,
  outputInfiniteLoaderSchema,
} from "@/schemas/infinite"
import { Status } from "@prisma/client"
import { z } from "zod"

export const categoryRouter = router({
  list: publicProcedure.query(() => {
    return prisma.category.findMany()
  }),

  listInfinite: publicProcedure
    .input(infiniteLoaderSchema)
    .output(outputInfiniteLoaderSchema)
    .query(async ({ input }) => {
      const { cursor } = input
      const limit = input.limit ?? 50
      const search = input.search ?? ""

      const items = await prisma.category.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        where: {
          name: {
            contains: search?.toLowerCase() ?? "",
          },
        },
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
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

  detail: publicProcedure.input(z.string()).query(({ input: id }) => {
    return prisma.category.findFirst({ where: { id } })
  }),

  create: publicProcedure.input(categorySchema).mutation(async ({ input }) => {
    const categoryCreated = await prisma.category.create({
      data: {
        name: input.name,
        description: input.description,
        banner: input.banner,
        status: input.status as Status,
      },
    })

    return categoryCreated
  }),

  update: publicProcedure
    .input(z.object({ id: z.string() }).extend(categorySchema.shape))
    .mutation(async ({ input }) => {
      const categoryUpdated = await prisma.category.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          description: input.description,
          banner: input.banner,
          status: input.status as Status,
        },
      })

      return categoryUpdated
    }),

  permanentlyDelete: publicProcedure
    .input(z.string())
    .mutation(async ({ input: id }) => {
      const categoryDeleted = await prisma.category.delete({ where: { id } })

      return categoryDeleted
    }),
})
