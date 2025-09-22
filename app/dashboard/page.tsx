import { Navigation } from "@/common";
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
  const user = await User.findById(userId)
    .select("-password -__v -createdAt -updatedAt")
    .lean();
  console.log("DB User:", user);
  if (!user) {
    // User not found in DB (shouldn't really happen)
    redirect("/register");
  } else if (!Array.isArray(user)) {
    // User object mongoose -> plain JS object
    (user as { _id: any })._id = (user as { _id: any })._id.toString(); // 👈 convert ObjectId
  }
  return (
    <div className="dashboard h-full w-full flex flex-1">
      <Navigation />
      <Dashboard user={user} />
    </div>
  );
};

export default DashboardPage;
