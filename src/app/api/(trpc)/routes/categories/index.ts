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

  detail: publicProcedure
    .input(
      z.object({
        id: z.string(),
        includes: z.record(z.enum(["metadata"]), z.boolean()).optional(),
      })
    )
    .query(({ input }) => {
      return prisma.category.findFirst({
        where: { id: input.id },
        include: {
          metadata: input?.includes?.metadata,
        },
      })
    }),

  create: publicProcedure.input(categorySchema).mutation(async ({ input }) => {
    const categoryCreated = await prisma.category.create({
      data: {
        name: input.name,
        slug: input.slug,
        description: input.description,
        banner: input.banner,
        status: input.status as Status,
      },
    })

    setTimeout(async () => {
      await prisma.catagoryMetadata.create({
        data: {
          metaTitle: input.metadata?.metaTitle,
          metaDescription: input.metadata?.metaDescription,
          metaKeyword: input.metadata?.metaKeyword,
          Category: {
            connect: {
              id: categoryCreated.id,
            },
          },
        },
      })
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
          slug: input.slug,

          description: input.description,
          banner: input.banner,
          status: input.status as Status,
        },
      })

      setTimeout(async () => {
        if (categoryUpdated.metadataId) {
          await prisma.catagoryMetadata.update({
            where: {
              id: categoryUpdated.metadataId,
            },
            data: {
              metaTitle: input.metadata?.metaTitle,
              metaDescription: input.metadata?.metaDescription,
              metaKeyword: input.metadata?.metaKeyword,
            },
          })
        }
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
