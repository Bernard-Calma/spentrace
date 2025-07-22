"use client";

import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AddTransaction, TransactionItem } from "./components";

const Transactions = ({
  closeAddTransaction,
  showAddTransaction,
}: {
  closeAddTransaction: () => void;
  showAddTransaction: boolean;
}) => {
  const id = useSelector((state: any) => state.user.id);
  const storeTransactions = useSelector(
    (state: any) => state.user.defaultBudget.transactions || []
  );
  const [transactions, setTransactions] =
    useState<Transaction[]>(storeTransactions);

  // update transactions state
  const updateTransactions = {
    delete: (id: string) => {
      setTransactions((prev) =>
        prev.filter((transaction) => transaction.id !== id)
      );
    },
  };

  // update transactions when storeTransactions change
  useEffect(() => {
    setTransactions(storeTransactions);
  }, [storeTransactions]);
  return (
    <div className="transactions-body w-full h-full flex flex-col items-start justify-start bg-white rounded-lg shadow-md">
      {showAddTransaction && (
        <AddTransaction hideComponent={closeAddTransaction} />
      )}
      <div className="transaction-header w-full flex items-center justify-between px-2 font-bold text-lg rounded-tl border-black bg-gray-300">
        <p className="flex-1">Due Date</p>
        <p className="flex-2">Name</p>
        <p className="flex-1">Amount</p>

        <p className="flex-1">Added by</p>
        <p className="flex-1">Status</p>
      </div>
      <div className="transaction-list w-full flex flex-1 flex-col">
        {/* Map through transactions and render them here */}
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transcationProp={transaction}
              updateTransactions={updateTransactions}
            />
          ))
        ) : (
          <p className="text-gray-500">No transactions found.</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;
