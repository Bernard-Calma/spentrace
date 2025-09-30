"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BudgetList, RecentTransactions } from "@/common";

const DashboardPage = () => {
  const { budgets } = useSelector((state: RootState) => state.user);
  const { budgetName, transactions } = useSelector(
    (state: RootState) => state.budget
  );

  return (
    <div className="dashboard h-full w-full flex flex-col flex-1">
      <p>Default Budget: {budgetName}</p>
      <RecentTransactions transactions={transactions} budgetName={budgetName} />
      <BudgetList budgets={budgets} />
    </div>
  );
};

export default DashboardPage;
