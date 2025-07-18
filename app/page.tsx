"use client";
import { demoUser } from "@/store/features/userSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  // Create a demo object
  const handleCreateDemo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(demoUser());
    // Dispatch the demoUser action to set the demo user state
    // // Check if demo already exists
    // const existingDemo = localStorage.getItem("demo");
    // if (!existingDemo) {
    //   // If demo does not exist, create a new demo object
    //   const demo = {
    //     user: "demo",
    //     budgets: [],
    //     defaultBudget: {},
    //   };
    //   localStorage.setItem("demo", JSON.stringify(demo));
    //   sessionStorage.setItem("allowCreateBudget", "true");
    // }
    // // Redirect to demo page
    // window.location.href = "/demo";
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-24">
      <h1>SpenTrace</h1>
      <Link
        href="/demo"
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
        onClick={handleCreateDemo}
      >
        Demo
      </Link>
    </main>
  );
}
