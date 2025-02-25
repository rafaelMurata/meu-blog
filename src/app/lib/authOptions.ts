// src/lib/authOptions.ts
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import { findUserByEmail } from "@/app/api/actions/jsonHandler.server"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials || !credentials?.password) return null

                const user = findUserByEmail(credentials.email)
                if (!user || !user.hashedPassword) return null

                const isValid = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )
                console.log('valid', isValid)
                return isValid ? user : null
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = {
                id: token.id as string,
                email: token.email,
                name: token.name
            };
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
}
