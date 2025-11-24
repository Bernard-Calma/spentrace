"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  BudgetList,
  RecentTransactions,
  TotalBalance,
  Calendar,
} from "@/common";
import { useEffect, useState } from "react";
import { PendingTransactions } from "./components";
import axios from "axios";

const DashboardPage = () => {
  const { budgets } = useSelector((state: RootState) => state.user);
  const { budgetName, transactions } = useSelector(
    (state: RootState) => state.budget
  );
  const { id } = useSelector((state: RootState) => state.user);

  const [userBudgets, setUserBudgets] = useState<Budget[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    axios.get(`/api/budgets/userBudgets/${id}`).then((response) => {
      // Handle the response if needed
      // console.log("Fetched budgets for user:", response.data.budgets);
      setUserBudgets(response.data.budgets);
    });
  }, [id]);

  useEffect(() => {
    const expenses = transactions
      .filter((tx) => tx.type === "expense")
      .reduce((sum, tx) => sum + tx.amount, 0);
    const income = transactions
      .filter((tx) => tx.type === "income")
      .reduce((sum, tx) => sum + tx.amount, 0);
    setTotalExpenses(expenses);
    setTotalIncome(income);
  }, [transactions]);

  return (
    <div className="dashboard h-full w-full flex flex-col flex-1">
      <h1 className="text-xl font-bold">Budget: {budgetName}</h1>
      <TotalBalance income={totalIncome} expenses={totalExpenses} />
      <div className="flex gap-4">
        <PendingTransactions transactions={transactions} />
        <Calendar itemListProp={transactions} />
      </div>
      <RecentTransactions transactions={transactions} budgetName={budgetName} />

      <BudgetList budgets={userBudgets} />
    </div>
  );
};

export default DashboardPage;
