"use client";
import { demoUser } from "@/store/features/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

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
      <header className="w-full mb-auto p-4 flex justify-between items-center bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">SpenTrace</h1>
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link href="/subscribe/feature" className="hover:text-blue-600">
            Features
          </Link>
          <Link href="/subscribe/plans" className="hover:text-blue-600">
            Plans
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            Login
          </Link>
          <Link
            href="/demo"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Demo
          </Link>
        </div>
      </header>
      <main className="flex w-full flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-6xl mx-auto gap-12">
          <div className="space-y-6 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Share Budgets,{" "}
              <span className="text-blue-600">Track Spending</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-lg">
              Spendloop makes it simple for families, friends, and teams to
              collaborate on budgets. Add expenses, set limits, and track
              together.
            </p>
            <div className="space-x-4">
              <a
                href="/register"
                className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
              >
                Get Started
              </a>
              <a
                href="/demo"
                className="px-6 py-3 border border-gray-300 rounded-xl shadow hover:bg-gray-100 transition"
              >
                Live Demo
              </a>
            </div>
          </div>
        </section>
        {/* Plans Section */}
        <section id="plans" className="w-full bg-white p-6">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Choose Your Plan
          </h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Plan */}
            <div className="border rounded-2xl shadow p-6 flex flex-col items-center text-center">
              <h4 className="text-xl font-semibold mb-2">Free</h4>
              <p className="text-gray-600 mb-4">For individuals starting out</p>
              <p className="text-3xl font-bold mb-6">
                $0<span className="text-base text-gray-500">/mo</span>
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>✔ 1 Budget</li>
                <li>✔ Expense Tracking</li>
                <li>✔ Demo Access</li>
              </ul>
              <a
                href="/register"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign Up
              </a>
            </div>

            {/* Pro Plan */}
            <div className="border-2 border-blue-600 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center">
              <h4 className="text-xl font-semibold mb-2">Pro</h4>
              <p className="text-gray-600 mb-4">
                For families and small groups
              </p>
              <p className="text-3xl font-bold mb-6">
                $9<span className="text-base text-gray-500">/mo</span>
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>✔ Unlimited Budgets</li>
                <li>✔ Shared Access</li>
                <li>✔ Priority Support</li>
              </ul>
              <a
                href="/register"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Get Pro
              </a>
            </div>

            {/* Business Plan */}
            <div className="border rounded-2xl shadow p-6 flex flex-col items-center text-center">
              <h4 className="text-xl font-semibold mb-2">Business</h4>
              <p className="text-gray-600 mb-4">For teams and organizations</p>
              <p className="text-3xl font-bold mb-6">
                $29<span className="text-base text-gray-500">/mo</span>
              </p>
              <ul className="space-y-2 text-gray-600 mb-6">
                <li>✔ Everything in Pro</li>
                <li>✔ Advanced Reports</li>
                <li>✔ Team Management</li>
              </ul>
              <a
                href="/register"
                className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Get Business
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer className="mt-auto p-2 flex flex-col items-center">
        <p>© {new Date().getFullYear()} SpenTrace. All rights reserved.</p>
        <div className="mt-2 flex space-x-4 justify-center">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </footer>
    </>
  );
}
