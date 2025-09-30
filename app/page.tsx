import { auth } from "@/lib/auth";
import {
  ComparePlans,
  FeatureSection,
  Footer,
  Header,
  HeroSection,
  PlanSection,
} from "./components";
import { redirect } from "next/navigation";
import axios from "axios";

const Home = async () => {
  const session = await auth();

  // console.log("Session:", session);
  if (session?.user) {
    // Check if user has a default budget from database
    const res = await axios.get(
      `${process.env.NEXTAUTH_URL}/api/users/${session.user.id}`
    );

    const user = await res.data.user;
    console.log("User Data: ", user);
    if (user?.defaultBudget == null) {
      redirect("/create-budget");
    } else {
      console.log("User has a default budget, redirecting to dashboard");
      redirect("/dashboard");
    }
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
