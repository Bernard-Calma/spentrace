"use server";

import { signIn, signOut } from "@/lib/auth";

export const providerLogin = async (provider: string) => {
  await signIn(provider, { redirectTo: "/dashboard" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
