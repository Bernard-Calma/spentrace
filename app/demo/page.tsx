"use client";

import { useEffect, useState } from "react";
import { ListPreview, TotalBalance } from "@/common";

import "./styles.scss";
import CreateBudgetPage from "./create-budget/page";

const DemoDashboard = () => {
  const [budget, setBudget] = useState({});

  useEffect(() => {
    // Check if budget data exists in localStorage
    const savedBudget = localStorage.getItem("budget");
    if (savedBudget) {
      setBudget({ ...JSON.parse(savedBudget).defaultBudget });
    } else {
      // If no budget data, redirect to create budget page
      sessionStorage.setItem("allowCreateBudget", "true");
    }
  }, []);
  if (!budget || Object.keys(budget).length === 0) {
    return <CreateBudgetPage />;
  }
  return (
    <div className="demo-dashboard h-full w-full flex flex-1 flex-col">
      <TotalBalance income={budget.income} expenses={budget.expenses} />
      <div className="budget-container w-full flex flex-1 flex-col bg-white">
        <div className="budget-header  flex  items-center gap-4 p-4 border-b">
          <div className="budget-info ">
            <h1 className="text-2xl font-bold">{budget.budgetName}</h1>
            <p className="text-lg">Owner: {budget.owner}</p>
          </div>
          <div className="collaborators">
            <p className="text-sm text-gray-500">
              Collaborators: {budget.collaborators || "None"}
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
