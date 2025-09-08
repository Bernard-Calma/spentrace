import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import clientPromise from "./lib/db";
import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Google,
    GitHub,
    LinkedIn({
      clientId: process.env.AUTH_LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.AUTH_LINKEDIN_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn(params) {
      const { user, profile } = params;
      if (profile) {
        (user as any).username =
          profile.name?.replace(/\s+/g, "").toLowerCase() ?? "User";
        (user as any).email = profile.email;
      }
      return true;
    },
  },
});
