import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import clientPromise from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [Google],
  callbacks: {
    async signIn({ user, profile }: { user: User; profile: any }) {
      if (profile) {
        user.username = profile.name.replace(/\s+/g, "").toLowerCase();
        user.email = profile.email;
      }
      return true;
    },
  },
});
