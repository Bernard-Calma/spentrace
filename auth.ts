import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import clientPromise from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [Google],
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
