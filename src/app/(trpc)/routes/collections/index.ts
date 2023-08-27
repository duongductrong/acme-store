import { router, shieldedProcedure } from "@/app/(trpc)/bootstrap/trpc"
import { outputQueryFilterResultsSchema } from "@/app/(trpc)/lib/trpc/schemas"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "@/app/(trpc)/lib/trpc/utils"
import { RESOURCE_KEYS } from "@/constant/resources"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import {
  collectionCreateInputSchema,
  collectionDeleteInputSchema,
  collectionDetailInputSchema,
  collectionListInputSchema,
  collectionUpdateInputSchema,
} from "./input"
import collectionService from "./service"

export const collectionShieldedProcedure = shieldedProcedure({
  resource: RESOURCE_KEYS.COLLECTION,
})

export const collectionRouter = router({
  list: collectionShieldedProcedure
    .input(collectionListInputSchema)
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

  detail: collectionShieldedProcedure.input(collectionDetailInputSchema).query(({ input: id }) => {
    return collectionService.detail(id)
  }),

  create: collectionShieldedProcedure
    .input(collectionCreateInputSchema)
    .mutation(async ({ input }) => {
      return collectionService.create({
        name: input.name,
        description: input.description,
        slug: input.slug,
      })
    }),

  update: collectionShieldedProcedure.input(collectionUpdateInputSchema).mutation(({ input }) => {
    return collectionService.update(input.id as string, {
      name: input.name,
      slug: input.slug,
      description: input.description,
    })
  }),

  permanentlyDelete: collectionShieldedProcedure
    .input(collectionDeleteInputSchema)
    .mutation(({ input: id }) => {
      return collectionService.delete(id)
    }),
})
