"use server";

import { signIn, signOut } from "@/lib/auth";

export const providerLogin = async (provider: string) => {
  await signIn(provider, { redirectTo: "/dashboard" });
};

export const credentialLogin = async (email: string, password: string) => {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    // If authorize returned null, NextAuth throws `CredentialsSignin`
    if (!res) {
      return { error: "Invalid email or password" };
    }

    return res;
  } catch (error: any) {
    if (error?.type === "CredentialsSignin") {
      return { error: "Invalid email or password" };
    }

    console.error("Unexpected login error:", error);
    return { error: "An unexpected error occurred. Please try again." };
  }
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
