"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { BudgetList } from "@/common";

const DashboardPage = () => {
  const { budgets } = useSelector((state: RootState) => state.user);
  const { budgetName } = useSelector((state: RootState) => state.budget);

  return (
    <div className="dashboard h-full w-full flex flex-col flex-1">
      <p>Default Budget: {budgetName}</p>
      <BudgetList budgets={budgets} />
    </div>
  );
};

export default DashboardPage;
