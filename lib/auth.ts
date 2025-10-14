import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import clientPromise from "./mongoClientdb";
import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { User } from "@/models/User";
import dbConnect from "./db";

// Extend NextAuth types to include 'username' and other custom fields
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      bills: string[];
      budgets: string[];
      defaultBudget: string;
      subscribed: string;
      email: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username: string;
    bills: string[];
    budgets: string[];
    defaultBudget: string;
    subscribed: string;
  }
}

interface Token {
  id: string;
  username: string;
  email: string;
  bills: string[];
  budgets: string[];
  defaultBudget: string;
  subscribed: string;
  isDemo: boolean;
  [key: string]: any; // for any additional properties
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        await dbConnect();
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const user = await User.findOne({ email: credentials.email });

        if (!user) {
          console.log("No user found with email:", credentials.email);
          return null; // tells NextAuth: "sign in failed"
        } else {
          // console.log("User found:", user);

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid password");
          } else {
            // console.log("Password is valid", user);
            return {
              id: user._id.toString(),
              email: user.email,
              username: user.username,
              bills: user.bills || [],
              budgets: user.budgets || [],
              defaultBudget: user.defaultBudget || "",
              subscribed: user.subscribed || "",
              name: user.name || null,
              image: user.image || null,
            };
          }
        }
      },
    }),
    Google,
    GitHub,
    LinkedIn,
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // JWT callback
    async jwt({ token, user }) {
      await dbConnect();
      if (user) {
        // Check if the user already exists in DB
        let dbUser = await User.findOne({ email: user.email })
          .select("-password -__v")
          .lean();

        console.log("DB User:", dbUser);

        if (!dbUser) {
          // Create user with all your fields
          const createdUser = await User.create({
            email: user.email,
            username: user.name?.replace(/\s+/g, "").toLowerCase(),
            password: "", // empty for provider
            bills: [],
            budgets: [],
            defaultBudget: "",
            subscribed: "",
          });

          // console.log("Created new user:", createdUser);

          // Convert Mongoose document to plain object
          dbUser = createdUser.toObject();
        } else if (
          dbUser &&
          !Array.isArray(dbUser) &&
          (dbUser as any).defaultBudget === undefined
        ) {
          // Ensure all fields exist for older users
          (dbUser as any).defaultBudget = "";
          (dbUser as any).bills = (dbUser as any).bills || [];
          (dbUser as any).budgets = (dbUser as any).budgets || [];
          (dbUser as any).subscribed = (dbUser as any).subscribed || "";
          await User.updateOne(
            { _id: (dbUser as any)._id },
            {
              $set: {
                defaultBudget: (dbUser as any).defaultBudget,
                bills: (dbUser as any).bills,
                budgets: (dbUser as any).budgets,
                subscribed: (dbUser as any).subscribed,
              },
            }
          );
          // console.log("Updated user with missing fields:", dbUser);
          // Add fields to token
          token.id = (dbUser as any)._id.toString();
          token.username = (dbUser as any).username;
          token.bills = (dbUser as any).bills;
          token.budgets = (dbUser as any).budgets;
          token.defaultBudget = (dbUser as any).defaultBudget;
          token.subscribed = (dbUser as any).subscribed;
          token.email = (dbUser as any).email;
        } else {
          // Add fields to token
          token.id = (dbUser as any)._id.toString();
          token.username = (dbUser as any).username;
          token.bills = (dbUser as any).bills;
          token.budgets = (dbUser as any).budgets;
          token.defaultBudget = (dbUser as any).defaultBudget;
          token.subscribed = (dbUser as any).subscribed;
          token.email = (dbUser as any).email;
        }
      }

      return token;
    },

    // Session callback
    async session({ session, token }) {
      // console.log("Session callback - session:", session);
      // console.log("Session callback - token:", token);
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
        session.user.bills = token.bills as string[];
        session.user.budgets = token.budgets as string[];
        session.user.defaultBudget = token.defaultBudget as string;
        session.user.subscribed = token.subscribed as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
});
