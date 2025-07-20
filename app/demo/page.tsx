"use client";

import { useEffect, useState } from "react";
import { BudgetList, Calendar, ListPreview, TotalBalance } from "@/common";

import "./styles.scss";
import RecentTransactions from "./RecentTransactions";
import BudgetPreview from "./BudgetPreview";
import { useDispatch, useSelector } from "react-redux";
import { loadFromLocalStorage } from "@/store/features/demoSlice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";

const DemoDashboard = () => {
  const router = useRouter();
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
    sessionStorage.setItem("allowCreateBudget", "true");
    // Check if demo data exists in localStorage
    const getBudgetData = async () => {
      const demoData = await dispatch(loadFromLocalStorage());
      console.log("Demo data loaded:", demoData.payload);
      if (demoData.payload.id) {
        setBudget(demoData.payload);
      } else {
        console.warn("No demo data found in localStorage.");

        router.push("/demo/create-budget");
      }
    };

    // Check if the user is in demo mode
    // If demo, get budgetFrom localStorage
    // If not demo, get budget from server
    if (isDemo) {
      getBudgetData();
    } else {
      // Fetch budget from server
    }
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
