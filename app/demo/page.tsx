"use client";

import { useEffect, useState } from "react";
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
  const { isDemo } = useSelector((state: any) => state.user);
  const storeBudget: Budget = useSelector((state: any) => state.demo);
  const [budget, setBudget] = useState<Budget>(
    isDemo
      ? storeBudget
      : {
          id: "",
          budgetName: "",
          owner: "",
          transactions: [],
          collaborators: [],
          history: [],
          totalIncome: 0,
          totalExpenses: 0,
        }
  );
  useEffect(() => {
    if (!budget.id) {
      sessionStorage.setItem("allowCreateBudget", "true");
      router.push("/demo/create-budget");
    } else {
      sessionStorage.setItem("allowCreateBudget", "false");
      dispatch(setDefaultBudget(budget));
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
          <BudgetPreview budget={budget} />
          <Calendar itemList={budget.transactions} />
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
