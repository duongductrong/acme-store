import { VALIDATION_MESSAGES } from "@/constant/messages"
import { RESOURCE_KEYS } from "@/constant/resources"
import prisma from "@/lib/prisma"
import { roleSchema } from "@/schemas/role"
import { Prisma } from "@prisma/client"
import { z } from "zod"
import { inputQueryFilterSchema } from "../../lib/trpc/schemas"
import { router, shieldedProcedure } from "../../bootstrap/trpc"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "../../lib/trpc/utils"

export const roleShieldedProcedure = shieldedProcedure({
  resource: RESOURCE_KEYS.ROLE,
})

export const roleRouter = router({
  list: roleShieldedProcedure
    .input(inputQueryFilterSchema.optional())
    .query(async ({ input }) => {
      const pagination = trpcHandleQueryFilterPagination(input)

      const whereRole = {} as Prisma.RoleBasedWhereInput

      const items = await prisma.roleBased.findMany({
        where: whereRole,
        skip: Number(pagination?.skip),
        cursor: pagination?.cursor,
        take: Number(pagination?.limit),
      })

      if (input?.paginationType === "offset") {
        const countItems = await prisma.roleBased.count({
          where: whereRole,
        })

        return trpcOutputQueryWithPagination(items, {
          type: "offset",
          page: Number(input?.page),
          pageSize: Number(input?.pageSize),
          totalRecords: countItems,
        })
      } else {
        return trpcOutputQueryWithPagination(items, {
          type: "cursor-based",
          nextCursor: "",
          previousCursor: "",
        })
      }
    }),

  detail: roleShieldedProcedure
    .input(z.object({ id: roleSchema.shape.id }))
    .query(({ input }) => {
      return prisma.roleBased.findFirst({ where: { id: input.id?.toString() } })
    }),

  create: roleShieldedProcedure
    .input(roleSchema)
    .mutation(async ({ input }) => {
      return prisma.roleBased.create({
        data: {
          name: input.name,
          description: input.description,
          policies: input.policies as object,
        },
      })
    }),

  update: roleShieldedProcedure
    .input(
      z
        .object({
          id: z.string().min(1),
        })
        .extend(roleSchema.shape)
        .superRefine(async ({ id }, ctx) => {
          const role = await prisma.roleBased.findFirst({
            where: { id: id?.toString() },
          })

          if (!role)
            ctx.addIssue({
              code: "custom",
              message: VALIDATION_MESSAGES.NOT_EXISTS("Name"),
              params: {},
              path: ["name"],
            })

          return ctx
        })
    )
    .mutation(async ({ input }) => {
      return prisma.roleBased.update({
        where: { id: input.id?.toString() },
        data: {
          name: input.name,
          description: input.description,
          policies: input.policies as object,
        },
      })
    }),

  permanentlyDelete: roleShieldedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.roleBased.delete({
        where: { id: input.id },
      })
    }),
})
