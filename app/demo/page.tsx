"use client";

import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import "./styles.scss";

const DemoPage = () => {
  const router = useRouter();
  const [budget, setBudget] = useState({
    budgetName: "",
    owner: "",
    collaborators: "",
    income: 0,
    expenses: 0,
    balance: 0,
  });

  useEffect(() => {
    // Check if budget data exists in localStorage
    const savedBudget = localStorage.getItem("budget");
    if (savedBudget) {
      console.log("Saved Budget:", savedBudget);
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
      <div className="total-balance mt-4 p-4 bg-gray-100 rounded shadow w-full max-w-md text-center flex items-center justify-between">
        <p className="text-lg">
          Income: <span className="income">$0.00</span>
        </p>
        <p className="text-lg">
          Expenses: <span className="expense">$0.00</span>
        </p>
        <p className="text-lg">
          Balance:{" "}
          <span
            className={`balance ${
              budget.balance <= 0 ? "negative" : "positive"
            }`}
          >
            $0.00
          </span>
        </p>
      </div>
    </div>
  );
};

export default DemoPage;
