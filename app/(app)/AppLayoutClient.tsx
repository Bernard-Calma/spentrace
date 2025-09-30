import { Navigation } from "@/common";

const AppLayoutClient = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: any;
}) => {
  console.log("User in AppLayoutClient:", user);
  return (
    <main className="flex flex min-h-screen">
      <Navigation user={user} />
      {children}
    </main>
  );
};

export default AppLayoutClient;
