import prisma from "@/lib/prisma"
import { protectedProcedure, publicProcedure, router } from "@/lib/trpc/trpc"
import { productSchema } from "@/schemas/product"
import { ProductVisibility, Status } from "@prisma/client"
import { z } from "zod"

export const productRouter = router({
  list: protectedProcedure.query(() => {
    return prisma.product.findMany()
  }),

  detail: publicProcedure.input(z.string()).query(({ input: id }) => {
    return prisma.product.findFirst({ where: { id } })
  }),

  create: publicProcedure.input(productSchema).mutation(async (payload) => {
    const { input } = payload

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
    .input(z.object({ id: z.string() }).extend(productSchema.shape))
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
