import { VALIDATION_MESSAGES } from "@/constant/messages"
import prisma from "@/lib/prisma"
import { inputQueryFilterSchema } from "@/lib/trpc/schemas"
import { publicProcedure, router } from "@/lib/trpc/trpc"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "@/lib/trpc/utils"
import { productSchema } from "@/schemas/product"
import { Prisma, ProductVisibility, Status } from "@prisma/client"
import { z } from "zod"

export const productRouter = router({
  list: publicProcedure
    .input(inputQueryFilterSchema.optional())
    .query(async ({ input }) => {
      const handledPagination = trpcHandleQueryFilterPagination(input)

      const where: Prisma.ProductWhereInput | undefined = undefined

      const productItems = await prisma.product.findMany({
        where,
        skip: handledPagination?.skip,
        take: handledPagination?.limit,
        cursor: handledPagination?.cursor,
        orderBy: {
          createdAt: "desc",
        },
      })

      if (input?.paginationType === "offset") {
        const countProductItems = await prisma.product.count({
          where,
        })

        return trpcOutputQueryWithPagination(productItems, {
          type: "offset",
          page: Number(input?.page),
          pageSize: Number(input?.pageSize),
          totalRecords: countProductItems,
        })
      } else {
        return trpcOutputQueryWithPagination(productItems, {
          type: "cursor-based",
          nextCursor: "",
          prevCursor: "",
        })
      }
    }),

  detail: publicProcedure
    .input(
      z.object({
        id: z.string(),
        includes: z.record(
          z.enum(["category", "media", "metadata"]),
          z.boolean()
        ),
      })
    )
    .query(({ input }) => {
      return prisma.product.findFirst({
        where: { id: input.id },
        include: input.includes,
      })
    }),

  create: publicProcedure
    .input(
      z.object({
        ...productSchema.shape,
        slug: productSchema.shape.slug.refine(async (slug) => {
          const product = await prisma.product.findFirst({
            where: { slug },
          })

          return !product
        }, VALIDATION_MESSAGES.ALREADY_EXISTS("slug")),
        SKU: productSchema.shape.SKU.refine(async (SKU) => {
          const product = await prisma.product.findFirst({
            where: { SKU },
          })

          return !product
        }, VALIDATION_MESSAGES.ALREADY_EXISTS("SKU")),
      })
    )
    .mutation(async ({ input }) => {
      const productCreated = await prisma.product.create({
        data: {
          title: input.title,
          description: input.description,
          price: input.price,
          quantity: input.quantity,
          SKU: input.SKU,
          slug: input.slug,
          thumbnail: input.thumbnail,
          categoryId: input.categoryId,
          content: input.content,
          status: input.status as Status,
          stockAvailability: input.stockAvailability,
          visibility: input.visibility as ProductVisibility,
          attributeGroupId: input.attributeGroupId,
        },
      })

      // run create product metadata in background
      setTimeout(async () => {
        await prisma.productMetadata.create({
          data: {
            metaTitle: input.metadata.metaTitle,
            metaDescription: input.metadata.metaDescription,
            metaKeyword: input.metadata.metaKeyword,
            Product: {
              connect: {
                id: productCreated.id,
              },
            },
          },
        })
      })

      return productCreated
    }),

  update: publicProcedure
    .input(
      z
        .object({
          ...productSchema.shape,
          id: z.string(),
          slug: productSchema.shape.slug,
        })
        .superRefine(async ({ slug, id, attributeGroupId }, ctx) => {
          const [product, attributeGroup] = await prisma.$transaction([
            prisma.product.findFirst({
              where: { slug, NOT: { id } },
            }),
            prisma.productAttributeGroup.findFirst({
              where: { id: attributeGroupId?.toString() },
            }),
          ])

          if (product) {
            ctx.addIssue({
              message: VALIDATION_MESSAGES.ALREADY_EXISTS("Slug"),
              code: "custom",
              path: ["slug"],
            })
          }

          if (!attributeGroup) {
            ctx.addIssue({
              message: VALIDATION_MESSAGES.NOT_EXISTS("Attribute Group"),
              code: "custom",
              path: ["attributeGroupId"],
            })
          }

          return ctx
        })
    )
    .mutation(async ({ input }) => {
      console.log(input)
      const productUpdated = await prisma.product.update({
        data: {
          title: input.title,
          description: input.description,
          price: input.price,
          quantity: input.quantity,
          SKU: input.SKU,
          slug: input.slug,
          thumbnail: input.thumbnail,
          categoryId: input.categoryId,
          content: input.content,
          status: input.status as Status,
          stockAvailability: input.stockAvailability,
          visibility: input.visibility as ProductVisibility,
          attributeGroupId: input.attributeGroupId,
        },
        where: { id: input.id },
      })

      setTimeout(async () => {
        await prisma.productMetadata.update({
          where: {
            id: productUpdated.metadataId as string,
          },
          data: {
            metaTitle: input.metadata.metaTitle,
            metaDescription: input.metadata.metaDescription,
            metaKeyword: input.metadata.metaKeyword,
          },
        })
      })

      return productUpdated
    }),

  permanentlyDelete: publicProcedure
    .input(z.string())
    .mutation(async ({ input: id }) => {
      return await prisma.product.delete({
        where: { id },
        include: { metadata: true },
      })
    }),
})
