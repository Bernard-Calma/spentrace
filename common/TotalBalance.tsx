"use client";

import { useEffect, useState } from "react";

interface TotalBalanceProps {
  income: number;
  expenses: number;
}

const TotalBalance = ({ income, expenses }: TotalBalanceProps) => {
  const [balance, setBalance] = useState(income - expenses);

  useEffect(() => {
    setBalance(income - expenses);
  }, [income, expenses]);
  return (
    <div className="total-balance py-4 bg-gray-100 w-full text-center flex items-center justify-between gap-4">
      <p className="text-lg font-semibold bg-white p-2 rounded flex-1 shadow">
        Total Income: <span className="income">${income}</span>
      </p>
      <p className="text-lg font-semibold bg-white p-2 rounded flex-1 shadow">
        Total Expenses: <span className="expense">${expenses}</span>
      </p>
      <p className="text-lg font-semibold bg-white p-2 rounded flex-1 shadow">
        Total Balance:{" "}
        <span className={`balance ${balance <= 0 ? "negative" : "positive"}`}>
          ${balance.toFixed(2)}
        </span>
      </p>
    </div>
  );
};

export default TotalBalance;
