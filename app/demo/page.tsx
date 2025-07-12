"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ListPreview, TotalBalance } from "@/common";

import "./styles.scss";
import { trace } from "console";
import { transcode } from "buffer";

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
    <div className="demo-page w-full flex flex-col items-center justify-start p-12">
      <h1 className="text-2xl font-bold">{budget.budgetName}</h1>
      <p className="text-lg">Owner: {budget.owner}</p>
      <TotalBalance income={budget.income} expenses={budget.expenses} />
      <ListPreview listItems={budget.transactions} />
    </div>
  );
};

export default DemoPage;
