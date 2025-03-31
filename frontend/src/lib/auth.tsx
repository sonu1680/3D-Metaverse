import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const NEXT_AUTH: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "user@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your password",
        },
        name: {
          label: "Name",
          type: "text",
          placeholder: "Enter Name",
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        // Fetch user by email
        const user = await prisma.user.findFirst({
          where: { email: credentials.email },
        });

        // Verify password if user exists
        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password || ""))
        ) {
          return { id: user.id, name: user.username, email: user.email };
        }

        // Create a new user if not found
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const newUser = await prisma.user.create({
          data: { email: credentials.email, password: hashedPassword },
        });

        return { id: newUser.id, name: newUser.username, email: newUser.email };
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_ID_SECRET || "",
    }),
  ],

  pages: {
    signIn: "/auth",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // Handle user sign-in (Google or email)
    async signIn({ user, account }) {
      const existingUser = await prisma.user.findFirst({
        where: { email: user.email || "" },
      });

      // Create user if they don't exist (Google OAuth)
      if (!existingUser && account) {
        await prisma.user.create({
          data: {
            email: user.email || "",
            name: user.name,
            image: user.image,
            providers: account.provider,
            providerAccountId: account.providerAccountId,
          },
        });
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const userDetails = await prisma.user.findFirst({
          where: { email: user.email || "" },
        });
        token.userId = userDetails?.id;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        //@ts-ignore
        session.user.userId = token.userId;
      }
      return session;
    },
  },
};
