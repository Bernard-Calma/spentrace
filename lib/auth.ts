import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import clientPromise from "./db";
import GitHub from "next-auth/providers/github";
import LinkedIn from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

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
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const db = (await clientPromise).db("spentrace");
        const user = await db
          .collection("users")
          .findOne({ email: credentials.email });

        if (!user) {
          console.log("No user found with email:", credentials.email);
          return null; // tells NextAuth: "sign in failed"
        } else {
          console.log("User found:", user);

          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );
          if (!isValid) {
            throw new Error("Invalid password");
          }
        }
        // return safe user object
        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name || "",
        };
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
