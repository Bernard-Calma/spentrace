"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { AddTransaction } from "./components";

const Transactions = ({
  closeAddTransaction,
  showAddTransaction,
}: {
  closeAddTransaction: () => void;
  showAddTransaction: boolean;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>(
    useSelector(
      (state: any) => state.user.defaultBudget.transactions || []
    ).map((transaction: any) => ({
      ...transaction,
      amount:
        typeof transaction.amount === "string"
          ? parseFloat(transaction.amount)
          : transaction.amount,
    }))
  );
  return (
    <div className="transactions-body w-full h-full flex flex-col items-start justify-start bg-white space-y-4 rounded-lg shadow-md">
      {showAddTransaction && (
        <AddTransaction hideComponent={closeAddTransaction} />
      )}
      <div className="transaction-header w-full flex items-center justify-between p-2 font-bold text-lg rounded-tl border-black bg-gray-300">
        <p className="flex-1">Due Date</p>
        <p className="flex-3">Name</p>
        <p className="flex-1">Amount</p>

        <p className="flex-1">Added by</p>
        <p className="flex-1">Status</p>
      </div>
      <div className="transaction-list w-full flex flex-1 flex-col space-y-2">
        {/* Map through transactions and render them here */}
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="transaction-item p-2 flex items-center justify-between border-b border-gray-200"
            >
              <p className="transaction-date">
                {new Date(transaction.date).toLocaleDateString()}
              </p>
              <p className="transaction-name ">{transaction.name}</p>
              <p
                className={`transaction-amount ${
                  transaction.type === "expense" ? "expense" : "income"
                }`}
              >
                {/* Insert comma ',' per 1000 and decimals */}$
                {transaction.amount > 1000
                  ? transaction.amount
                      .toFixed(2)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : transaction.amount.toFixed(2)}
              </p>
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
