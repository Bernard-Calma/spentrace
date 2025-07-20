"use client";

import { useEffect, useState } from "react";
import { BudgetList, Calendar, ListPreview, TotalBalance } from "@/common";

import "./styles.scss";
import RecentTransactions from "./RecentTransactions";
import BudgetPreview from "./BudgetPreview";
import { useDispatch, useSelector } from "react-redux";
import { loadFromLocalStorage } from "@/store/features/demoSlice";
import { AppDispatch } from "@/store/store";

const DemoDashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isDemo } = useSelector((state: any) => state.user);
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
    // Check if demo data exists in localStorage
    let demoData = {};
    const checkIfDemo = async () => {
      demoData = await dispatch(loadFromLocalStorage());
      console.log("Demo data loaded:", demoData);
    };
    checkIfDemo();
    // if (!existingDemo) {
    //   // If demo does not exist, create a new demo object
    //   const demo = {
    //     user: "demo",
    //     budgets: [],
    //     defaultBudget: {},
    //   };
    //   localStorage.setItem("demo", JSON.stringify(demo));
    //   sessionStorage.setItem("allowCreateBudget", "true");
    // }
    // // Redirect to demo page
    sessionStorage.setItem("allowCreateBudget", "true");
  }, []);
  return (
    <div className="demo-dashboard h-full w-full flex flex-1 flex-col">
      <TotalBalance
        income={budget.totalIncome}
        expenses={budget.totalExpenses}
      />
      <div className="budget-container flex flex-1 flex-col bg-white p-2 gap-4 shadow-md rounded-lg">
        <div className="dashboard-header flex flex-col lg:flex-row h-auto items-start justify-between gap-4">
          <BudgetPreview />
          <Calendar itemList={budget.transactions} />
        </div>

        <RecentTransactions />
        <BudgetList />
      </div>
    </div>
  );
};

export default DemoDashboard;
