import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import AppLayoutClient from "./AppLayoutClient";
import axios from "axios";

const AppLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  const res = await axios.get(
    `${process.env.NEXTAUTH_URL}/api/budgets/${session?.user?.defaultBudget}`
  );
  const budget = await res.data.budget;

  return (
    <AppLayoutClient user={session?.user} budget={budget}>
      {children}
    </AppLayoutClient>
  );
};

export default AppLayout;
