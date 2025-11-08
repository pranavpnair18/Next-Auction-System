import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { AuthOptions } from "next-auth";

const prisma = new PrismaClient();

// ✅ THIS OBJECT MUST HAVE "providers" AS AN ARRAY
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [  // 👈 this must be an array
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Missing email or password");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user || !user.password) throw new Error("User not found");

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name =  user.name;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role ?? "USER";
        
      
      return session;
      
    },
  },

  session: { strategy: "jwt" },
  pages: { signIn: "/signin" },
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Export the handler separately
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
