import prisma from "@/lib/prisma"
import { Status } from "@prisma/client"
import { CategoryCreateInputSchema, CategoryUpdateInputSchema } from "./input"

class CategoryService {
  createMetadata(connectCategoryId: string, input: CategoryCreateInputSchema["metadata"]) {
    return prisma.categoryMetadata.create({
      data: {
        metaTitle: input?.metaTitle,
        metaDescription: input?.metaDescription,
        metaKeyword: input?.metaKeyword,
        Category: {
          connect: {
            id: connectCategoryId,
          },
        },
      },
    })
  }

  updateMetadata(id: string, input: CategoryUpdateInputSchema["metadata"]) {
    return prisma.categoryMetadata.update({
      where: {
        id: id,
      },
      data: {
        metaTitle: input?.metaTitle,
        metaDescription: input?.metaDescription,
        metaKeyword: input?.metaKeyword,
      },
    })
  }

  deleteMetadata(id: string) {
    return prisma.categoryMetadata.deleteMany({ where: { id } })
  }

  detail(id: string, options?: { include: Record<"metadata", boolean> }) {
    return prisma.category.findFirst({
      where: { id },
      include: {
        metadata: options?.include?.metadata,
      },
    })
  }

  create(input: Omit<CategoryCreateInputSchema, "metadata">) {
    return prisma.category.create({
      data: {
        name: input.name,
        slug: input.slug,
        description: input.description,
        banner: input.banner,
        status: input.status as Status,
      },
    })
  }

  update(id: string, input: Omit<CategoryUpdateInputSchema, "id">) {
    return prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: input.name,
        slug: input.slug,

        description: input.description,
        banner: input.banner,
        status: input.status as Status,
      },
    })
  }

  delete(id: string) {
    return prisma.category.delete({ where: { id } })
  }

  bulkDelete() {}
}

const categoryService = new CategoryService()

export default categoryService
