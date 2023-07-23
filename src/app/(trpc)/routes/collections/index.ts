import {
  inputQueryFilterSchema,
  outputQueryFilterResultsSchema,
} from "@/app/(trpc)/lib/trpc/schemas"
import { router, shieldedProcedure } from "@/app/(trpc)/bootstrap/trpc"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "@/app/(trpc)/lib/trpc/utils"
import { RESOURCE_KEYS } from "@/constant/resources"
import prisma from "@/lib/prisma"
import { collectionSchema } from "@/schemas/collection"
import { Prisma } from "@prisma/client"
import { z } from "zod"
import { VALIDATION_MESSAGES } from "@/constant/messages"

export const collectionShieldedProcedure = shieldedProcedure({
  resource: RESOURCE_KEYS.COLLECTION,
})

export const collectionRouter = router({
  list: collectionShieldedProcedure
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

  detail: collectionShieldedProcedure
    .input(
      z
        .number()
        .or(z.string())
        .transform((v) => Number(v))
    )
    .query(({ input: id }) => {
      return prisma.collection.findFirst({ where: { id } })
    }),

  create: collectionShieldedProcedure
    .input(
      collectionSchema.superRefine(async (values, ctx) => {
        const collection = await prisma.collection.findFirst({
          where: {
            slug: values.slug,
          },
        })

        if (collection) {
          return ctx.addIssue({
            message: VALIDATION_MESSAGES.ALREADY_EXISTS("Slug"),
            path: ["slug"],
            code: "custom",
          })
        }

        return ctx
      })
    )
    .mutation(async ({ input }) => {
      return prisma.collection.create({
        data: {
          slug: input.slug,
          name: input.name,
          description: input.description,
        },
      })
    }),

  update: collectionShieldedProcedure
    .input(
      z
        .object({ id: z.number() })
        .extend(collectionSchema.shape)
        .superRefine(async (values, ctx) => {
          const collection = await prisma.collection.findFirst({
            where: {
              slug: values.slug,
              id: {
                not: Number(values.id)
              },
            },
          })

          if (collection) {
            return ctx.addIssue({
              message: VALIDATION_MESSAGES.ALREADY_EXISTS("Slug"),
              path: ["slug"],
              code: "custom",
            })
          }

          return ctx
        })
    )
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

  permanentlyDelete: collectionShieldedProcedure
    .input(z.number())
    .mutation(({ input: id }) => {
      return prisma.collection.delete({ where: { id } })
    }),
})
