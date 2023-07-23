import { inputQueryFilterSchema } from "@/app/(trpc)/lib/trpc/schemas"
import { router, shieldedProcedure } from "@/app/(trpc)/bootstrap/trpc"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "@/app/(trpc)/lib/trpc/utils"
import { RESOURCE_KEYS } from "@/constant/resources"
import prisma from "@/lib/prisma"
import { categorySchema } from "@/schemas/category"
import { Prisma, Status } from "@prisma/client"
import { z } from "zod"
import { VALIDATION_MESSAGES } from "@/constant/messages"

export const categoryShieldedProcedure = shieldedProcedure({
  resource: RESOURCE_KEYS.CATEGORY,
})

export const categoryRouter = router({
  list: categoryShieldedProcedure
    .input(inputQueryFilterSchema.optional())
    .query(async ({ input }) => {
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

  detail: categoryShieldedProcedure
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

  create: categoryShieldedProcedure
    .input(
      categorySchema.superRefine(async (values, ctx) => {
        const category = await prisma.category.findFirst({
          where: { slug: values.slug },
        })

        if (category) {
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
        await prisma.categoryMetadata.create({
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

  update: categoryShieldedProcedure
    .input(
      z
        .object({ id: z.string() })
        .extend(categorySchema.shape)
        .superRefine(async (values, ctx) => {
          const category = await prisma.category.findFirst({
            where: {
              slug: values.slug,
              id: {
                not: values.id,
              },
            },
          })

          if (category) {
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
          await prisma.categoryMetadata.update({
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

  permanentlyDelete: categoryShieldedProcedure
    .input(z.string())
    .mutation(async ({ input: id }) => {
      const categoryDeleted = await prisma.category.delete({ where: { id } })

      return categoryDeleted
    }),
})
