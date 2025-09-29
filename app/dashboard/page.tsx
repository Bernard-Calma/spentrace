import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Dashboard } from "./components";
import dbConnect from "@/lib/db";
import { User } from "@/models/User";

const DashboardPage = async () => {
  const session = await auth();

  console.log("Session:", session);

  if (!session?.user) redirect("/login");

  const userId = session.user.id;

  await dbConnect();

  // Get fresh user data from DB
  const dbUser: any = await User.findById(userId)
    .select("-password -__v -createdAt -updatedAt")
    .lean();
  console.log("DB User:", dbUser);
  if (!dbUser) {
    // User not found in DB (shouldn't really happen)
    redirect("/register");
  }
  // Ensure dbUser is a plain object and has required User fields
  const user: AppUser = {
    id: dbUser._id.toString(),
    username: dbUser.username,
    email: dbUser.email,
    image: dbUser.image ?? null,
    emailVerified: dbUser.emailVerified ?? null,
    bills: dbUser.bills || [],
    budgets: dbUser.budgets || [],
    defaultBudget: dbUser.defaultBudget || "",
    subscribed: dbUser.subscribed || "",
  };
  return (
    <div className="dashboard h-full w-full flex flex-1">
      <Dashboard user={user} />
    </div>
  );
};

export default DashboardPage;
