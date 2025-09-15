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
              name: user.username,
              test: "test", // 👈 custom field
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
