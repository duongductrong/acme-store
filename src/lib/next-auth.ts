import { Role, User } from "@prisma/client"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { comparePassword } from "./bcrypt"
import prisma from "./prisma"
import userService from "@/app/(trpc)/routes/users/service"
import { TRPCError } from "@trpc/server"
import { JWT } from "next-auth/jwt"

export interface NextAuthCredentials {
  email: string
  password: string
}

export interface NextAuthSession {
  user: {
    firstName: string
    lastName: string
    email: string
    id: string
    role: Role
    roleId: string
  }
  expires: Date
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials, req): Promise<any> {
        const { email, password } = credentials as NextAuthCredentials

        const user = await userService.detail(email, { include: { role: true } })

        if (!user) return null

        const isMatchedPassword = comparePassword(password, user.passwordHashed)

        if (!isMatchedPassword) return null

        return user
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        const myUser = user as unknown as User & { role: Role }

        return {
          ...token,
          firstName: myUser.firstName,
          lastName: myUser.lastName,
          id: myUser.id,
          randomKey: myUser.id,
          role: myUser.role,
        }
      }
      return token
    },
    async session({ session, token }) {
      const _token = token as unknown as JWT & User

      const currentUser = await userService.detail(_token.id, { include: { role: true } })

      if (!currentUser) throw new TRPCError({ code: "UNAUTHORIZED" })

      return {
        ...session,
        user: {
          ...session.user,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          email: currentUser.email,
          id: currentUser.id,
          role: currentUser.role,
        },
        expires: session.expires,
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
}
