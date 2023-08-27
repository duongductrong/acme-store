import prisma from "@/lib/prisma"

export interface UserServiceDetailOptions {
  include: Record<"role", boolean>
}

class UserService {
  detail(identify: string, options?: UserServiceDetailOptions) {
    return prisma.user.findFirst({
      where: { OR: [{ email: identify }, { id: identify }] },
      include: {
        role: options?.include.role,
      },
    })
  }
}

const userService = new UserService()

export default userService
