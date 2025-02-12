import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { SafeUser } from "@/app/types";
import { findUserByEmail } from "@/app/api/actions/jsonHandler";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Verificar se as credenciais foram fornecidas
        if (!credentials || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        // Buscar usuário pelo email
        const user = findUserByEmail(credentials.email);

        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials");
        }

        // Comparar a senha fornecida com a senha armazenada
        const isCorrectPassword = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        // Retornar o usuário seguro (sem expor informações sensíveis)
        const safeUser: SafeUser = {
          id: user.id,
          name: user.name,
          email: user.email,
          hashedPassword: user.hashedPassword,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          emailVerified: user.emailVerified,
        };

        return safeUser;
      },
    }),
  ],
  pages: {
    signIn: "/", // Página de login personalizada (opcional)
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
