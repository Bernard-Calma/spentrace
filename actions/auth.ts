"use server";

import { signIn, signOut } from "@/lib/auth";

export const credentialLogin = async (email: string, password: string) => {
  await signOut({ redirect: false }); // clear any existing session
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
  // Clear any existing session
  await signOut({ redirect: false });
  await signIn(provider, { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
