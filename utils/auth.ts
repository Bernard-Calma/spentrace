"use server";

import { signIn, signOut } from "@/auth";

export const login = async () => {
  await signIn("google", { redirectTo: "/demo" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
