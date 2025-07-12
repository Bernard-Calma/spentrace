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
    <div className="total-balance mt-4 p-4 bg-gray-100 rounded shadow w-full max-w-md text-center flex items-center justify-between">
      <p className="text-lg">
        Income: <span className="income">${income.toFixed(2)}</span>
      </p>
      <p className="text-lg">
        Expenses: <span className="expense">${expenses.toFixed(2)}</span>
      </p>
      <p className="text-lg">
        Balance:{" "}
        <span className={`balance ${balance <= 0 ? "negative" : "positive"}`}>
          ${balance.toFixed(2)}
        </span>
      </p>
    </div>
  );
};

export default TotalBalance;
