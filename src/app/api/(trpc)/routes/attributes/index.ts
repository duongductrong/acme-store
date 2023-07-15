import prisma from "@/lib/prisma"
import { publicProcedure, router } from "@/lib/trpc/trpc"
import { attributeSchema } from "@/schemas/attribute"
import { ProductAttributeType } from "@prisma/client"
import difference from "lodash/difference"
import { z } from "zod"

export const attributeRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          includes: z.record(z.enum(["groups"]), z.boolean()).optional(),
        })
        .optional()
    )
    .query(({ input }) => {
      return prisma.productAttribute.findMany({
        include: {
          groups: { include: { productAttributeGroup: true } },
        },
      })
    }),

  detail: publicProcedure.input(z.string()).query(async ({ input: id }) => {
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

  // groups: publicProcedure
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

  create: publicProcedure.input(attributeSchema).mutation(async ({ input }) => {
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

  update: publicProcedure
    .input(z.object({ id: z.number().min(1) }).extend(attributeSchema.shape))
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

  permanentlyDelete: publicProcedure
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
