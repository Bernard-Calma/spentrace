"use client";

import { useEffect, useState } from "react";
import { BudgetList, ListPreview, TotalBalance } from "@/common";

import "./styles.scss";
import RecentTransactions from "./RecentTransactions";
import BudgetPreview from "./BudgetPreview";

const DemoDashboard = () => {
  const [budget, setBudget] = useState<Budget>({
    id: "",
    budgetName: "",
    owner: "",
    transactions: [],
    collaborators: [],
    totalIncome: 0,
    totalExpenses: 0,
  });

  useEffect(() => {
    // Check if budget data exists in localStorage
    const demo: Demo = JSON.parse(localStorage.getItem("demo") || "{}");
    const localBudget: Budget = demo.defaultBudget || {};
    if (localBudget.id) {
      setBudget({ ...localBudget });
    } else {
      // If no budget exists, redirect to create budget page
      window.location.href = "/demo/create-budget";
    }
  }, []);
  return (
    <div className="demo-dashboard h-full w-full flex flex-1 flex-col">
      <TotalBalance
        income={budget.totalIncome}
        expenses={budget.totalExpenses}
      />
      <div className="budget-container w-full flex flex-1 flex-col bg-white p-2 gap-4 shadow-md rounded-lg">
        <div className="dashboard-header flex items-center justify-between gap-4">
          <BudgetPreview />
          <div className="calendar flex-1 h-full bg-gray-100 rounded-lg p-4 shadow">
            Calendar Goes Here
          </div>
        </div>

        <RecentTransactions />
        <BudgetList />
      </div>
    </div>
  );
};

export default DemoDashboard;
