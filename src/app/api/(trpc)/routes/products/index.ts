import { VALIDATION_MESSAGES } from "@/constant/messages"
import prisma from "@/lib/prisma"
import { publicProcedure, router } from "@/lib/trpc/trpc"
import { productSchema } from "@/schemas/product"
import { ProductVisibility, Status } from "@prisma/client"
import { z } from "zod"

export const productRouter = router({
  list: publicProcedure.query(() => {
    return prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    })
  }),

  detail: publicProcedure.input(z.string()).query(({ input: id }) => {
    return prisma.product.findFirst({ where: { id } })
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
      })
    )
    .mutation(async ({ input }) => {
      const productCreated = await prisma.product.create({
        data: {
          productName: input.productName,
          description: input.description,
          price: input.price,
          quantity: input.quantity,
          SKU: input.SKU,
          slug: input.slug,
          thumbnail: input.thumbnail,
          categoryId: input.categoryId,
          content: input.content,
          media: input.media ?? [],
          status: input.status as Status,
          stockAvailability: input.stockAvailability,
          visibility: input.visibility as ProductVisibility,
        },
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
        .superRefine(async ({ slug, id }, ctx) => {
          const product = await prisma.product.findFirst({
            where: { slug, NOT: { id } },
          })

          if (product) {
            ctx.addIssue({
              message: VALIDATION_MESSAGES.ALREADY_EXISTS("Slug"),
              code: "custom",
              path: ["slug"],
            })
          }

          return ctx
        })
    )
    .mutation(async ({ input }) => {
      const productUpdated = await prisma.product.update({
        data: {
          productName: input.productName,
          description: input.description,
          price: input.price,
          quantity: input.quantity,
          SKU: input.SKU,
          slug: input.slug,
          thumbnail: input.thumbnail,
          categoryId: input.categoryId,
          content: input.content,
          media: input.media ?? [],
          status: input.status as Status,
          stockAvailability: input.stockAvailability,
          visibility: input.visibility as ProductVisibility,
        },
        where: { id: input.id },
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
