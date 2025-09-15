import { Navigation } from "@/common";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  // console.log("Session:", session);

  if (!session?.user) redirect("/login");
  return (
    <div className="dashboard h-full w-full flex flex-1 flex-col">
      <Navigation />
      Dashboard {session.user.username}
    </div>
  );
};

export default DashboardPage;
