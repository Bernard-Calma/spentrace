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
    <div className="total-balance py-4 bg-gray-100 w-full text-center flex items-center justify-between lg:gap-4 gap-2  ">
      <div className="text-xs lg:text-lg font-semibold bg-white lg:p-2 rounded flex-1 lg:flex justify-center gap-2 shadow">
        <p>Total Income:</p>
        <p className="income">${income}</p>
      </div>
      <div className="text-xs lg:text-lg font-semibold bg-white lg:p-2 rounded flex-1 lg:flex justify-center gap-2 shadow">
        <p>Total Expenses:</p>
        <p className="expense">${expenses}</p>
      </div>
      <div className="text-xs lg:text-lg font-semibold bg-white lg:p-2 rounded flex-1 lg:flex justify-center gap-2 shadow">
        <p>Total Balance:</p>
        <p className={`balance ${balance <= 0 ? "negative" : "positive"}`}>
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default TotalBalance;
