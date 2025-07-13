"use client";

import { useEffect, useState } from "react";
import { BudgetList, ListPreview, TotalBalance } from "@/common";

import "./styles.scss";

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
      <div className="budget-container w-full flex flex-1 flex-col bg-white p-2">
        <BudgetList />
        <div className="budget-header  flex  items-center gap-4 p-4 border-b">
          <div className="budget-info ">
            <h1 className="text-2xl font-bold">{budget.budgetName}</h1>
            <p className="text-lg">Owner: {budget.owner}</p>
          </div>
          <div className="collaborators">
            <p className="text-sm text-gray-500">
              Collaborators:{" "}
              {budget.collaborators.length > 0
                ? budget.collaborators.join(", ")
                : "None"}
            </p>
          </div>
        </div>
        <div className="budget flex flex-1 items-start justify-between mt-4 p-2">
          <ListPreview listItems={budget.transactions} />
        </div>
      </div>
    </div>
  );
};

export default DemoDashboard;
