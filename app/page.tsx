"use client";
import { demoUser } from "@/store/features/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Footer, Header, HeroSection, PlanSection } from "./components";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  // Create a demo object
  const handleCreateDemo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(demoUser());
    router.push("/demo");
  };

  return (
    <>
      <Header />
      <main className="flex w-full flex-col items-center justify-center">
        <HeroSection />
        <PlanSection />
      </main>
      <Footer />
    </>
  );
}
