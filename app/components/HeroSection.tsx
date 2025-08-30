"use client";

import { demoUser } from "@/store/features/userSlice";
import Link from "next/link";
import { useDispatch } from "react-redux";

const HeroSection = () => {
  const dispatch = useDispatch();
  return (
    <section className="flex flex-col md:min-h-screen md:flex-row items-center justify-between px-8 py-16 max-w-6xl mx-auto gap-12">
      <div className="space-y-6 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
          Share Budgets, <span className="text-blue-600">Track Spending</span>
        </h2>
        <p className="text-lg text-gray-600 max-w-lg">
          Spendloop makes it simple for families, friends, and teams to
          collaborate on budgets. Add expenses, set limits, and track together.
        </p>
        <div className="space-x-4">
          <Link
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            onClick={() => dispatch(demoUser())}
            href="/demo"
            className="px-6 py-3 border border-gray-300 rounded-xl shadow hover:bg-gray-100 transition"
          >
            Live Demo
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
