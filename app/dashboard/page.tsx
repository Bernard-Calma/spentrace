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
  const dbUser = await User.findById(userId)
    .select("-password -__v -createdAt -updatedAt")
    .lean();
  // console.log("DB User:", dbUser);
  if (!dbUser || Array.isArray(dbUser)) {
    // User not found in DB (shouldn't really happen)
    redirect("/register");
  }
  // Ensure user is a plain object and matches the User type
  const user = {
    id: (dbUser as { _id: any })._id.toString(),
    username: dbUser.username,
    email: dbUser.email,
    image: dbUser.image ?? null,
    emailVerified: dbUser.emailVerified ?? null,
  };

  return (
    <div className="dashboard h-full w-full flex flex-1">
      <Dashboard user={user} />
    </div>
  );
};

export default DashboardPage;
