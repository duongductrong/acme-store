import { router, shieldedProcedure } from "@/app/(trpc)/bootstrap/trpc"
import { inputQueryFilterSchema } from "@/app/(trpc)/lib/trpc/schemas"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "@/app/(trpc)/lib/trpc/utils"
import { RESOURCE_KEYS } from "@/constant/resources"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { z } from "zod"
import {
  productCreateInputSchema,
  productDetailInputSchema,
  productUpdateInputSchema,
} from "./input"
import productService from "./service"

export const productShieldedProcedure = shieldedProcedure({
  resource: RESOURCE_KEYS.PRODUCT,
})

export const productRouter = router({
  list: productShieldedProcedure
    .input(inputQueryFilterSchema.optional())
    .query(async ({ input, ctx }) => {
      const handledPagination = trpcHandleQueryFilterPagination(input)

      const where: Prisma.ProductWhereInput | undefined = undefined

      const orderBy = input?.sorting?.map((sort) => ({ [sort.id]: sort.desc ? "desc" : "asc" }))

      const productItems = await prisma.product.findMany({
        where,
        skip: handledPagination?.skip,
        take: handledPagination?.limit,
        cursor: handledPagination?.cursor,
        orderBy,
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
          previousCursor: "",
        })
      }
    }),

  detail: productShieldedProcedure.input(productDetailInputSchema).query(async ({ input }) => {
    return productService.detail(input.id, {
      include: {
        category: input.includes.category,
        media: input.includes.media,
        metadata: input.includes.metadata,
      },
    })
  }),

  create: productShieldedProcedure.input(productCreateInputSchema).mutation(async ({ input }) => {
    const productCreated = await productService.create(input)

    await productService.createMetadata(input.metadata, productCreated.id)
    await productService.createVariants(input.variants, productCreated.id)

    return productCreated
  }),

  update: productShieldedProcedure.input(productUpdateInputSchema).mutation(async ({ input }) => {
    const productUpdated = await productService.update(input)

    await productService.updateMetadata(input.metadata, productUpdated.metadataId as string)
    await productService.updateVariants(input.variants, productUpdated.id)

    return productUpdated
  }),

  permanentlyDelete: productShieldedProcedure.input(z.string()).mutation(async ({ input: id }) => {
    const deleteProductVariantsResult = await productService.deleteVariants(id)
    const deleteProductResult = await productService.permanentlyDelete(id)

    return {
      deleteProductVariantsResult,
      deleteProductResult,
    }
  }),
})
