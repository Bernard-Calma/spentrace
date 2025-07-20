"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

const Transactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    useSelector((state: any) => state.user.defaultBudget.transactions || [])
  );
  return (
    <div className="transactions-body w-full h-full flex flex-col items-start justify-start bg-white p-4 space-y-4 rounded-lg">
      <div className="transaction-list w-full flex flex-1 flex-col space-y-2">
        {/* Map through transactions and render them here */}
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <p>{transaction.name}</p>
              <p>{transaction.amount}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
