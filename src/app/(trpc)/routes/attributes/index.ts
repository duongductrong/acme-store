import prisma from "@/lib/prisma"
import { inputQueryFilterSchema } from "@/app/(trpc)/lib/trpc/schemas"
import { shieldedProcedure, router } from "@/app/(trpc)/bootstrap/trpc"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "@/app/(trpc)/lib/trpc/utils"
import { attributeSchema } from "@/schemas/attribute"
import { Prisma, ProductAttributeType } from "@prisma/client"
import difference from "lodash/difference"
import { z } from "zod"
import { RESOURCE_KEYS } from "@/constant/resources"
import { VALIDATION_MESSAGES } from "@/constant/messages"

export const attributeShieldedProcedure = shieldedProcedure({
  resource: RESOURCE_KEYS.ATTRIBUTE,
})

export const attributeRouter = router({
  list: attributeShieldedProcedure
    .input(
      z
        .intersection(
          z
            .object({
              includes: z.record(z.enum(["groups"]), z.boolean()).optional(),
            })
            .optional(),
          inputQueryFilterSchema.optional()
        )
        .optional()
    )
    .query(async ({ input }) => {
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

  detail: attributeShieldedProcedure
    .input(z.string())
    .query(async ({ input: id }) => {
      const attribute = await prisma.productAttribute.findFirst({
        where: { id },
        include: { groups: true },
      })

      return Object.assign(
        {
          groupIds:
            attribute?.groups.map(
              (attrGroup) => attrGroup.productAttributeGroupId
            ) ?? [],
        },
        attribute
      )
    }),

  // groups: attributeShieldedProcedure
  //   .input(attributeBelongsToGroupInputSchema)
  //   .query(async ({ input }) => {
  //     const belongsGroups = await prisma.productAttributesOnGroups.findMany({
  //       where: { productAttributeId: input.attributeId },
  //     })

  //     const groupIds = belongsGroups.map(
  //       ({ productAttributeGroupId }) => productAttributeGroupId
  //     )

  //     return prisma.productAttributeGroup.findMany({
  //       where: { id: { in: groupIds } },
  //     })
  //   }),

  create: attributeShieldedProcedure
    .input(
      attributeSchema.superRefine(async (values, ctx) => {
        const attribute = await prisma.productAttribute.findFirst({
          where: { code: values.code },
        })

        if (attribute) {
          ctx.addIssue({
            code: "custom",
            message: VALIDATION_MESSAGES.ALREADY_EXISTS("Code"),
            path: ["code"],
          })
        }

        return ctx
      })
    )
    .mutation(async ({ input }) => {
      const createdAttribute = await prisma.productAttribute.create({
        data: {
          name: input.name,
          code: input.code,
          options: input.options as any,
          sortOrder: 1,
          type: input.type as ProductAttributeType,
          isFilterable: input.isFilterable,
          isRequired: input.isRequired,
          isShowToCustomer: input.isShowToCustomer,
        },
      })

      if (input.groupIds?.length) {
        await prisma.productAttributesOnGroups.createMany({
          data: input.groupIds?.map((attrGroupId) => ({
            productAttributeGroupId: attrGroupId as string,
            productAttributeId: createdAttribute.id,
          })),
          skipDuplicates: true,
        })
      }

      return createdAttribute
    }),

  update: attributeShieldedProcedure
    .input(
      z
        .object({ id: z.number().min(1) })
        .extend(attributeSchema.shape)
        .superRefine(async (values, ctx) => {
          const attribute = await prisma.productAttribute.findFirst({
            where: { code: values.code, id: { not: values.id?.toString() } },
          })

          if (attribute) {
            ctx.addIssue({
              code: "custom",
              message: VALIDATION_MESSAGES.ALREADY_EXISTS("Code"),
              path: ["code"],
            })
          }

          return ctx
        })
    )
    .mutation(async ({ input }) => {
      const updatedAttribute = await prisma.productAttribute.update({
        where: { id: input.id as string },
        data: {
          name: input.name,
          code: input.code,
          options: input.options as any,
          sortOrder: 1,
          type: input.type as ProductAttributeType,
          isFilterable: input.isFilterable,
          isRequired: input.isRequired,
          isShowToCustomer: input.isShowToCustomer,
        },
      })

      if (input.groupIds?.length) {
        const requestGroupIds = input.groupIds

        const attrBelongsToGroup =
          await prisma.productAttributesOnGroups.findMany({
            where: { productAttributeId: updatedAttribute.id },
          })
        const belongsToGroupIds = attrBelongsToGroup.map(
          (attrGroup) => attrGroup.productAttributeGroupId
        )

        const addNewIds = difference(requestGroupIds, belongsToGroupIds)
        const deleteIds = difference(belongsToGroupIds, requestGroupIds)

        console.log({ addNewIds, deleteIds })

        await prisma.$transaction([
          prisma.productAttributesOnGroups.deleteMany({
            where: {
              productAttributeGroupId: {
                in: deleteIds as string[],
              },
            },
          }),
          prisma.productAttributesOnGroups.createMany({
            data: addNewIds.map((attrGroupId) => ({
              productAttributeGroupId: attrGroupId as string,
              productAttributeId: updatedAttribute.id,
            })),
            skipDuplicates: true,
          }),
        ])
      }

      return updatedAttribute
    }),

  permanentlyDelete: attributeShieldedProcedure
    .input(z.string())
    .mutation(async ({ input: id }) => {
      // Delete relationships
      await prisma.productAttributesOnGroups.deleteMany({
        where: {
          productAttributeId: id,
        },
      })

      return prisma.productAttribute.delete({
        where: { id },
      })
    }),
})
