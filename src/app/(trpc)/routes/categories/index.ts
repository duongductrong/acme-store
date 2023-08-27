import { router, shieldedProcedure } from "@/app/(trpc)/bootstrap/trpc"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "@/app/(trpc)/lib/trpc/utils"
import { ERROR_MESSAGES } from "@/constant/messages"
import { RESOURCE_KEYS } from "@/constant/resources"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { omit } from "lodash"
import {
  categoryCreateInputSchema,
  categoryDeleteInputSchema,
  categoryDetailInputSchema,
  categoryListInputSchema,
  categoryUpdateInputSchema,
} from "./input"
import categoryService from "./service"

export const categoryShieldedProcedure = shieldedProcedure({
  resource: RESOURCE_KEYS.CATEGORY,
})

export const categoryRouter = router({
  list: categoryShieldedProcedure.input(categoryListInputSchema).query(async ({ input }) => {
    const search = input?.search ?? ""
    const pagination = trpcHandleQueryFilterPagination(input)
    const where: Prisma.CategoryWhereInput = {
      name: {
        contains: search?.toLowerCase() ?? "",
      },
    }
    const items = await prisma.category.findMany({
      where,
      skip: pagination?.skip, // get an extra item at the end which we'll use as next cursor
      take: pagination?.limit, // get an extra item at the end which we'll use as next cursor
      cursor: pagination?.cursor ? { id: pagination?.cursor } : undefined,
      orderBy: {
        id: "asc",
      },
    })
    if (input?.paginationType === "cursor-based") {
      // const cursor = pagination?.cursor || undefined
      let nextCursor: any = undefined
      if (items.length > Number(pagination?.limit)) {
        const nextItem = items.pop()
        nextCursor = nextItem!.id
      }
      return trpcOutputQueryWithPagination(items, {
        nextCursor,
        previousCursor: "",
        type: "cursor-based",
      })
    }
    const countItems = await prisma.category.count({ where })
    return trpcOutputQueryWithPagination(items, {
      type: "offset",
      page: Number(input?.page),
      pageSize: Number(input?.pageSize),
      totalRecords: countItems,
    })
  }),

  detail: categoryShieldedProcedure.input(categoryDetailInputSchema).query(({ input }) => {
    return categoryService.detail(input.id, {
      include: {
        metadata: Boolean(input.includes?.metadata),
      },
    })
  }),

  create: categoryShieldedProcedure.input(categoryCreateInputSchema).mutation(async ({ input }) => {
    const categoryCreated = await categoryService.create(omit(input, ["metadata"]))

    setTimeout(async () => {
      await categoryService.createMetadata(categoryCreated.id, input.metadata)
    })

    return categoryCreated
  }),

  update: categoryShieldedProcedure.input(categoryUpdateInputSchema).mutation(async ({ input }) => {
    const categoryUpdated = await categoryService.update(input.id as string, {
      name: input.name,
      slug: input.slug,
      status: input.status,
      banner: input.banner,
      description: input.description,
    })

    setTimeout(async () => {
      if (categoryUpdated.metadataId) {
        await categoryService.updateMetadata(categoryUpdated.metadataId, input.metadata)
      }
    })

    return categoryUpdated
  }),

  permanentlyDelete: categoryShieldedProcedure
    .input(categoryDeleteInputSchema)
    .mutation(async ({ input: id }) => {
      const category = await categoryService.detail(id, { include: { metadata: true } })

      if (!category) throw new TRPCError({ code: "NOT_FOUND", message: ERROR_MESSAGES.NOT_FOUND() })

      if (category.metadataId) await categoryService.deleteMetadata(category.metadataId)

      return categoryService.delete(id)
    }),
})
