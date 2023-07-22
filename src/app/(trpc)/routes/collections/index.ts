import prisma from "@/lib/prisma"
import {
  inputQueryFilterSchema,
  outputQueryFilterResultsSchema,
} from "@/app/(trpc)/lib/trpc/schemas"
import { shieldedProcedure, router } from "@/app/(trpc)/lib/trpc/trpc"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "@/app/(trpc)/lib/trpc/utils"
import { collectionSchema } from "@/schemas/collection"
import { Prisma } from "@prisma/client"
import { z } from "zod"

export const collectionRouter = router({
  list: shieldedProcedure
    .input(inputQueryFilterSchema.optional())
    .output(outputQueryFilterResultsSchema)
    .query(async ({ input }) => {
      const search = input?.search || ""
      const pagination = trpcHandleQueryFilterPagination(input)

      const where: Prisma.CollectionWhereInput = {
        name: {
          contains: search ?? "",
        },
      }

      const items = await prisma.collection.findMany({
        where,
        take: pagination?.limit,
        cursor: pagination?.cursor ? { id: pagination?.cursor } : undefined,
      })

      if (input?.paginationType === "cursor-based") {
        let nextCursor: any = undefined
        let previousCursor: any = undefined

        if (items.length > Number(pagination?.limit)) {
          const nextItem = items.pop()
          nextCursor = nextItem!.id
        }

        return trpcOutputQueryWithPagination(items, {
          type: "cursor-based",
          nextCursor,
          previousCursor,
        })
      }

      const countItems = await prisma.collection.count({ where })

      return trpcOutputQueryWithPagination(items, {
        type: "offset",
        page: Number(input?.page),
        pageSize: Number(input?.pageSize),
        totalRecords: countItems,
      })
    }),

  detail: shieldedProcedure
    .input(
      z
        .number()
        .or(z.string())
        .transform((v) => Number(v))
    )
    .query(({ input: id }) => {
      return prisma.collection.findFirst({ where: { id } })
    }),

  create: shieldedProcedure
    .input(collectionSchema)
    .mutation(async ({ input }) => {
      return prisma.collection.create({
        data: {
          slug: input.slug,
          name: input.name,
          description: input.description,
        },
      })
    }),

  update: shieldedProcedure
    .input(z.object({ id: z.number() }).extend(collectionSchema.shape))
    .mutation(({ input }) => {
      return prisma.collection.update({
        where: {
          id: input.id as unknown as number,
        },
        data: {
          slug: input.slug,
          name: input.name,
          description: input.description,
        },
      })
    }),

  permanentlyDelete: shieldedProcedure
    .input(z.number())
    .mutation(({ input: id }) => {
      return prisma.collection.delete({ where: { id } })
    }),
})
