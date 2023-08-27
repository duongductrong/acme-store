import prisma from "@/lib/prisma"
import { CollectionCreateInputSchema, CollectionUpdateInputSchema } from "./input"

class CollectionService {
  detail(id: string) {
    return prisma.collection.findFirst({ where: { id } })
  }

  create(input: Omit<CollectionCreateInputSchema, "id">) {
    return prisma.collection.create({
      data: {
        slug: input.slug,
        name: input.name,
        description: input.description,
      },
    })
  }

  update(id: string, input: Omit<CollectionUpdateInputSchema, "id">) {
    return prisma.collection.update({
      where: {
        id,
      },
      data: {
        slug: input.slug,
        name: input.name,
        description: input.description,
      },
    })
  }

  delete(id: string) {
    return prisma.collection.delete({ where: { id } })
  }
}

const collectionService = new CollectionService()

export default collectionService
