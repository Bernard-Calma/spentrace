"use server";

import { signIn, signOut } from "@/lib/auth";

export const credentialLogin = async (email: string, password: string) => {
  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false, // prevent NextAuth auto-redirect
      callbackUrl: "/dashboard",
    });

    // console.log("signIn response:", res);

    if (!res) {
      // edge case: NextAuth didn’t return anything
      return { error: "Unexpected error: no response from auth." };
    }

    if (res.error) {
      console.log("Login failed:", res);
      return { error: "Invalid email or password" };
    }

    // Login successful
    return { success: true };
  } catch (error) {
    console.error("Unexpected login error:", error);
    return { error: "Invalid email or password" };
  }
};

export const providerLogin = async (provider: string) => {
  await signIn(provider, { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
