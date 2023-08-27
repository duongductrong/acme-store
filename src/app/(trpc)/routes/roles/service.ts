import prisma from "@/lib/prisma"
import { RoleScope } from "@prisma/client"
import { RoleCreateInputSchema, RoleUpdateInputSchema } from "./input"

class RoleService {
  detail(id: string) {
    return prisma.role.findFirst({ where: { id: id } })
  }

  create(input: RoleCreateInputSchema) {
    return prisma.role.create({
      data: {
        name: input.name,
        description: input.description,
        privileges: input.privileges as object,
        scope: input.scope as RoleScope,
      },
    })
  }

  update(input: RoleUpdateInputSchema) {
    return prisma.role.update({
      where: { id: input.id?.toString() },
      data: {
        name: input.name,
        description: input.description,
        privileges: input.privileges as object,
        scope: input.scope as RoleScope,
      },
    })
  }

  delete(id: string) {
    return prisma.role.delete({
      where: { id: id },
    })
  }

  bulkDelete(ids: string[]) {
    return prisma.role.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    })
  }
}

const roleService = new RoleService()

export default roleService
