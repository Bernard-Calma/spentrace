"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { setDefaultBudget } from "@/store/features/userSlice";

import { BudgetList, Calendar, TotalBalance } from "@/common";
import RecentTransactions from "./RecentTransactions";
import BudgetPreview from "./BudgetPreview";

import "./styles.scss";

const DemoDashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const budget: Budget = useSelector((state: any) => state.demo);

  useEffect(() => {
    if (budget.id === "") {
      sessionStorage.setItem("allowCreateBudget", "true");
      router.push("/demo/create-budget");
    } else {
      sessionStorage.setItem("allowCreateBudget", "false");
      dispatch(setDefaultBudget(budget));
    }
  }, []);

  // Load first budget from local storage if available
  if (!budget.id) {
    // Loading screen or placeholder can be added here
    return (
      <div className="loading-screen h-full w-full flex items-center justify-center">
        <p className="text-gray-500">Loading your budget...</p>
      </div>
    );
  } else
    return (
      <div className="demo-dashboard h-full w-full flex flex-1 flex-col">
        <TotalBalance
          income={budget.totalIncome}
          expenses={budget.totalExpenses}
        />
        <div className="budget-container flex flex-1 flex-col bg-white p-2 gap-4 shadow-md rounded-lg">
          <div className="dashboard-header flex flex-col lg:flex-row h-auto items-start justify-between gap-4">
            <BudgetPreview budget={budget} />
            <Calendar itemListProp={budget.transactions} />
          </div>
          <RecentTransactions
            transactions={budget.transactions}
            budgetName={budget.budgetName}
          />
          <BudgetList />
        </div>
      </div>
    );
};

export default DemoDashboard;
