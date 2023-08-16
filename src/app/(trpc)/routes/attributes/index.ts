import { router, shieldedProcedure } from "@/app/(trpc)/bootstrap/trpc"
import { inputQueryFilterSchema } from "@/app/(trpc)/lib/trpc/schemas"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "@/app/(trpc)/lib/trpc/utils"
import { VALIDATION_MESSAGES } from "@/constant/messages"
import { RESOURCE_KEYS } from "@/constant/resources"
import prisma from "@/lib/prisma"
import { attributeSchema } from "@/schemas/attribute"
import {
  Prisma,
  ProductAttributeOption,
  ProductAttributeType,
} from "@prisma/client"
import difference from "lodash/difference"
import { z } from "zod"

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
        include: { groups: true, options: true },
      })

      return {
        groupIds:
          attribute?.groups.map(
            (attrGroup) => attrGroup.productAttributeGroupId
          ) ?? [],
        ...attribute,
      }
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
          options: {
            createMany: {
              data: input.options.map((option) => ({
                code: option?.code as string,
                name: option?.name as string,
              })),
            },
          },
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
      const currentAttribute = await prisma.productAttribute.findFirst({
        where: { OR: [{ id: input.id as string }, { code: input.code }] },
        include: {
          options: true,
        },
      })

      const updatedAttribute = await prisma.productAttribute.update({
        where: { id: currentAttribute?.id },
        data: {
          name: input.name,
          code: input.code,
          sortOrder: 1,
          type: input.type as ProductAttributeType,
          isFilterable: input.isFilterable,
          isRequired: input.isRequired,
          isShowToCustomer: input.isShowToCustomer,
        },
      })

      const deleteAttributeOptIds = currentAttribute?.options.reduce(
        (totalIds, { id }) => ({ ...totalIds, [id]: true }),
        {} as Record<string, boolean>
      )
      const attrOptionsUpdateOrCreatesOrDeletes = input.options.reduce(
        (group, option) => {
          if (option?.id || option?.attributeId) {
            group.updates.push({
              id: option.id as string,
              code: option?.code as string,
              name: option?.name as string,
            })

            delete group.deletes?.[option?.id as string]
          } else {
            group.creates.push({
              code: option?.code as string,
              name: option?.name as string,
              attributeId: updatedAttribute.id,
            })

            delete group.deletes?.[option?.id as string]
          }

          return group
        },
        { creates: [], updates: [], deletes: deleteAttributeOptIds } as {
          creates: Omit<ProductAttributeOption, "id">[]
          updates: Omit<ProductAttributeOption, "attributeId">[]
          deletes: Record<string, boolean>
        }
      )

      // Update product attribute options (creates or updates)
      const {
        creates: attributeOptionCreates,
        updates: attributeOptionUpdates,
        deletes: attributeOptionDeletes,
      } = attrOptionsUpdateOrCreatesOrDeletes

      const getIdsAttributeOptionDeletes = Object.keys(attributeOptionDeletes)

      console.log("getIdsAttributeOptionDeletes", getIdsAttributeOptionDeletes)
      const getDeleteVariantAttributeIds =
        await prisma.productVariantAttribute.findMany({
          where: {
            productAttributeOptionId: {
              in: getIdsAttributeOptionDeletes,
            },
          },
          select: { id: true },
        })
      console.log("getDeleteVariantAttributeIds", getDeleteVariantAttributeIds)
      const getDeletesProductVariants = await prisma.productVariant.findMany({
        where: {
          attributes: {
            some: {
              id: { in: getDeleteVariantAttributeIds.map(({ id }) => id) },
            },
          },
        },
      })
      console.log("deletesProductVariants", getDeletesProductVariants)

      throw new Error("asdadjhs")

      await prisma.$transaction([
        prisma.productAttributeOption.createMany({
          data: attributeOptionCreates,
        }),

        ...attributeOptionUpdates.map((option) =>
          prisma.productAttributeOption.update({
            where: {
              id: option.id,
            },
            data: option,
          })
        ),

        // Delete product attribute options
        prisma.productAttributeOption.deleteMany({
          where: {
            id: {
              in: getIdsAttributeOptionDeletes,
            },
          },
        }),

        // Delete many product variants includes attribute options id removed
        // prisma.productVariant.deleteMany({
        //   where: {
        //     attributes: {
        //       some: {
        //         productAttributeOptionId: {
        //           in: getIdsAttributeOptionDeletes,
        //         },
        //       },
        //     },
        //   },
        // }),
      ])

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
      await prisma.$transaction([
        prisma.productAttributesOnGroups.deleteMany({
          where: {
            productAttributeId: id,
          },
        }),
        prisma.productAttributeOption.deleteMany({
          where: {
            attributeId: id,
          },
        }),
      ])

      return prisma.productAttribute.delete({
        where: { id },
      })
    }),
})
