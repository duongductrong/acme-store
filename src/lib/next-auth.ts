import { RoleBased, User } from "@prisma/client"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { comparePassword } from "./bcrypt"
import prisma from "./prisma"

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
    role: RoleBased
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

        const user = await prisma.user.findFirst({
          where: { email },
          include: { role: true },
        })

        if (!user) return null

        const isMatchedPassword = comparePassword(password, user.passwordHashed)

        if (!isMatchedPassword) return null

        return user
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const myUser = user as unknown as User & { role: RoleBased }

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
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          id: token.id,
          role: token.role,
        },
        expires: session.expires,
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === "development",
}
