// src/lib/authOptions.ts
import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                const storedHash = process.env.ADMIN_HASHED_PASSWORD!.trim();
                console.log('Hash armazenado (raw):', storedHash);
                console.log('Hash length:', storedHash.length);

                try {
                    const isEmailMatch = credentials.email.trim() === process.env.ADMIN_EMAIL?.trim();
                    const isPasswordValid = await bcrypt.compare(
                        credentials.password,
                        process.env.ADMIN_HASHED_PASSWORD!.trim()
                    );

                    console.log('Email válido:', isEmailMatch);
                    console.log('Senha válida:', isPasswordValid);

                    return isEmailMatch && isPasswordValid ? {
                        id: "1",
                        email: process.env.ADMIN_EMAIL!,
                        name: "Admin User"
                    } : null;

                } catch (error) {
                    console.error('Erro na autenticação:', error);
                    return null;
                }
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
