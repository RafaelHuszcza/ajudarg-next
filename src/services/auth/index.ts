import { compare } from 'bcrypt'
import { type NextAuthOptions } from 'next-auth'
import { getServerSession } from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

import { prisma } from '../database'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      image?: string
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
  }
}
interface User {
  id: string
  email: string
  name: string
}
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  pages: {
    signIn: '/auth',
    signOut: '/auth/signout',
    error: '/auth',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  providers: [
    CredentialsProvider({
      name: 'Sign in',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        })
        if (!user) {
          return null
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password,
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        } as User
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      }
    },
  },
}

export const getServerSessionWithAuth = () => getServerSession(authOptions)
