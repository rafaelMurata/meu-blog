import bcrypt from "bcrypt"
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"

import prisma from "@/app/libs/prismadb"
import { getServerSession } from "next-auth/next";
import { SafeUser } from "@/app/types"

export async function getSession() {
  return await getServerSession();
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        if (!user || !user?.hashedPassword) {
          throw new Error('Invalid credentials');
        }
        //console.log(credentials.password+'-laokoas');
        //console.log(user.hashedPassword+'-sssss');

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );
        
        if (!isCorrectPassword) {
          throw new Error('Invalid credentials');
        }
        //console.log(JSON.stringify(user)+'-user');

        const safeUser: SafeUser = {
          ...user,
          createdAt: user.createdAt.toISOString(),
          updatedAt: user.updatedAt.toISOString(),
          emailVerified: user.emailVerified?.toISOString() || null,
        };
      
        return safeUser;
      }
    })
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions);