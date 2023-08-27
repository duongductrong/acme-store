import { RESOURCE_KEYS } from "@/constant/resources"
import prisma from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { router, shieldedProcedure } from "../../bootstrap/trpc"
import {
  trpcHandleQueryFilterPagination,
  trpcOutputQueryWithPagination,
} from "../../lib/trpc/utils"
import {
  roleCreateInputSchema,
  roleDeleteInputSchema,
  roleDetailInputSchema,
  roleListInputSchema,
  roleUpdateInputSchema,
} from "./input"
import roleService from "./service"

export const roleShieldedProcedure = shieldedProcedure({
  resource: RESOURCE_KEYS.ROLE,
})

export const roleRouter = router({
  list: roleShieldedProcedure.input(roleListInputSchema).query(async ({ input }) => {
    const pagination = trpcHandleQueryFilterPagination(input)

    const whereRole = {} as Prisma.RoleWhereInput

    const items = await prisma.role.findMany({
      where: whereRole,
      skip: Number(pagination?.skip),
      cursor: pagination?.cursor,
      take: Number(pagination?.limit),
    })

    if (input?.paginationType === "offset") {
      const countItems = await prisma.role.count({
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

  detail: roleShieldedProcedure.input(roleDetailInputSchema).query(({ input }) => {
    return roleService.detail(input.id)
  }),

  create: roleShieldedProcedure.input(roleCreateInputSchema).mutation(async ({ input }) => {
    return roleService.create(input)
  }),

  update: roleShieldedProcedure.input(roleUpdateInputSchema).mutation(async ({ input }) => {
    return roleService.update(input)
  }),

  permanentlyDelete: roleShieldedProcedure.input(roleDeleteInputSchema).mutation(({ input }) => {
    return roleService.delete(input.id)
  }),
})
