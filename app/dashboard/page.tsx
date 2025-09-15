import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  console.log("Session:", session);

  if (!session?.user) redirect("/register");
  return (
    <div className="dashboard h-full w-full flex flex-1 flex-col">
      Dashboard{" "}
      {session?.user
        ? `- Welcome, ${session.user.name || session.user.email}`
        : ""}
    </div>
  );
};

export default DashboardPage;
