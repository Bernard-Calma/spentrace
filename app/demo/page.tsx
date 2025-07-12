"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ListPreview, Navigation, TotalBalance } from "@/common";

import "./styles.scss";

const DemoPage = () => {
  const router = useRouter();
  const [budget, setBudget] = useState({
    budgetName: "",
    owner: "",
    transactions: [],
    collaborators: "",
    income: 0,
    expenses: 0,
    balance: 0,
  });

  useEffect(() => {
    // Check if budget data exists in localStorage
    const savedBudget = localStorage.getItem("budget");
    if (savedBudget) {
      setBudget({ ...budget, ...JSON.parse(savedBudget) });
    } else {
      // If no budget data, redirect to create budget page
      sessionStorage.setItem("allowCreateBudget", "true");
      router.push("/demo/create-budget");
    }
  }, []);
  return (
    <div className="demo-page w-full flex items-center justify-start">
      <Navigation />
      <div className="budget-details flex-1 max-w-3xl p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold">{budget.budgetName}</h1>
        <p className="text-lg">Owner: {budget.owner}</p>
        <TotalBalance income={budget.income} expenses={budget.expenses} />
        <ListPreview listItems={budget.transactions} />
      </div>
    </div>
  );
};

export default DemoPage;
