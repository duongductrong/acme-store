import { router, shieldedProcedure } from "@/app/(trpc)/bootstrap/trpc"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "@/app/(trpc)/lib/trpc/utils"
import { RESOURCE_KEYS } from "@/constant/resources"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { TRPCError } from "@trpc/server"
import { compact } from "lodash"
import difference from "lodash/difference"
import { z } from "zod"
import {
  attributeCreateInputSchema,
  attributeListInputSchema,
  attributeUpdateInputSchema,
} from "./input"
import attributeService from "./service"
import { ERROR_MESSAGES } from "@/constant/messages"

export const attributeShieldedProcedure = shieldedProcedure({
  resource: RESOURCE_KEYS.ATTRIBUTE,
})

export const attributeRouter = router({
  list: attributeShieldedProcedure.input(attributeListInputSchema).query(async ({ input }) => {
    const where: Prisma.ProductAttributeWhereInput = {}
    const pagination = trpcHandleQueryFilterPagination(input)

    const attributes = await prisma.productAttribute.findMany({
      where,
      skip: pagination?.skip,
      take: pagination?.limit,
      cursor: pagination?.cursor,
      include: {
        groups: { include: { productAttributeGroup: true } },
      },
    })

    if (input?.paginationType === "cursor-based") {
      throw new Error("Not implemented yet.")
    }

    const countItems = await prisma.productAttribute.count({ where })
    return trpcOutputQueryWithPagination(attributes, {
      type: "offset",
      page: Number(input?.page),
      pageSize: Number(input?.pageSize),
      totalRecords: countItems,
    })
  }),

  detail: attributeShieldedProcedure.input(z.string()).query(async ({ input: id }) => {
    const attribute = await attributeService.detail(id, {
      include: { groups: true, options: true },
    })

    return {
      groupIds: attribute?.groups.map((attrGroup) => attrGroup.productAttributeGroupId) ?? [],
      ...attribute,
    }
  }),

  create: attributeShieldedProcedure
    .input(attributeCreateInputSchema)
    .mutation(async ({ input }) => {
      const createdAttribute = await attributeService.create(input)

      if (input.groupIds?.length) {
        await attributeService.connectAttributeGroup(compact(input.groupIds), createdAttribute.id)
      }

      return createdAttribute
    }),

  update: attributeShieldedProcedure
    .input(attributeUpdateInputSchema)
    .mutation(async ({ input }) => {
      const attribute = await attributeService.detail(input.id as string, {
        code: input.code,
        include: {
          options: true,
        },
      })

      if (!attribute)
        throw new TRPCError({ code: "NOT_FOUND", message: ERROR_MESSAGES.NOT_FOUND() })

      await attributeService.updateAttributeOptions(attribute.id, attribute.options, {
        options: input.options,
      })

      if (input.groupIds?.length) {
        const requestGroupIds = input.groupIds

        const attrBelongsToGroup = await prisma.productAttributesOnGroups.findMany({
          where: { productAttributeId: attribute.id },
        })
        const belongsToGroupIds = attrBelongsToGroup.map(
          (attrGroup) => attrGroup.productAttributeGroupId
        )

        const addNewConnectionGroupIds = compact(difference(requestGroupIds, belongsToGroupIds))
        const deleteConnectedGroupIds = compact(difference(belongsToGroupIds, requestGroupIds))

        await prisma.$transaction([
          attributeService.disconnectAttributeGroup(deleteConnectedGroupIds),
          attributeService.connectAttributeGroup(addNewConnectionGroupIds, attribute.id),
        ])
      }

      return attributeService.update(attribute.id, {
        name: input.name,
        code: input.code,
        sortOrder: input.sortOrder,
        isFilterable: input.isFilterable,
        isRequired: input.isRequired,
        isShowToCustomer: input.isShowToCustomer,
      })
    }),

  permanentlyDelete: attributeShieldedProcedure
    .input(z.string())
    .mutation(async ({ input: id }) => {
      await attributeService.disconnectAttributeGroup([id])
      await attributeService.deleteProductVariantsBelongsToAttributeOption([id])
      await attributeService.deleteOptions([id])

      return attributeService.delete([id])
    }),
})
