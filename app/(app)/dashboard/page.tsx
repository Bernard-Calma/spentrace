"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BudgetList, RecentTransactions, TotalBalance } from "@/common";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { budgets } = useSelector((state: RootState) => state.user);
  const { budgetName, transactions } = useSelector(
    (state: RootState) => state.budget
  );

  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);

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
      <p>Default Budget: {budgetName}</p>
      <TotalBalance income={totalIncome} expenses={totalExpenses} />
      <RecentTransactions transactions={transactions} budgetName={budgetName} />
      <BudgetList budgets={budgets} />
    </div>
  );
};

export default DashboardPage;
