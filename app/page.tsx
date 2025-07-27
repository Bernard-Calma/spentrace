"use client";
import { demoUser } from "@/store/features/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const { isDemo } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  // Create a demo object
  const handleCreateDemo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(demoUser());
    router.push("/demo");
  };

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center p-24">
      <h1>SpenTrace</h1>
      <Link
        href="/demo"
        className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition-colors"
        onClick={isDemo ? handleCreateDemo : () => {}}
      >
        Demo
      </Link>
    </main>
  );
}
