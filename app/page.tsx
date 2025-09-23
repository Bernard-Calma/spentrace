import { auth } from "@/lib/auth";
import {
  ComparePlans,
  FeatureSection,
  Footer,
  Header,
  HeroSection,
  PlanSection,
} from "./components";
import { Navigation } from "@/common";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();

  console.log("Session:", session);
  if (session?.user) {
    // User is logged in, redirect to dashboard
    // Note: This won't be a full redirect since it's in a Server Component
    if (!session.user.defaultBudget) {
      redirect("/create-budget");
    }
    return (
      <main className="h-full w-full flex flex-1">
        <Navigation />
      </main>
    );
  }
  return (
    <>
      <Header />
      <main className="relative flex w-full flex-col items-center justify-center">
        <HeroSection />
        <FeatureSection />
        <PlanSection />
        <ComparePlans />
      </main>
      <Footer />
    </>
  );
};

export default Home;
