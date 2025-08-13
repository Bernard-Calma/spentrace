"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TransactionHeader, TransactionItem } from "./components";
import EditTransaction from "./components/EditTranscation";
import { RootState } from "@/store/store";

const Transactions = () => {
  const id = useSelector((state: RootState) => state.user.id);
  const storeTransactions: Transaction[] = useSelector(
    (state: RootState) => state.demo.transactions || []
  );
  const [transactions, setTransactions] =
    useState<Transaction[]>(storeTransactions);

  const [showTransaction, setShowTransaction] = useState({
    show: false,
    transaction: {} as Transaction,
  });

  const [filter, setFilter] = useState<TransactionStatus>("all");

  const handleToggleTransaction = (transaction: Transaction | null) => {
    setShowTransaction({
      show: !showTransaction.show,
      transaction: transaction || ({} as Transaction),
    });
  };

  // update transactions when storeTransactions change
  useEffect(() => {
    const handleTransactionFilters = (filter: TransactionStatus) => {
      // Filter transactions based on the selected status
      const filteredTransactions = storeTransactions.filter(
        (transaction) => transaction.status === filter
      );
      setTransactions(filteredTransactions);
    };

    // If filter is 'all', show all transactions
    if (filter === "all") {
      setTransactions(storeTransactions);
    } else {
      handleTransactionFilters(filter);
    }
  }, [storeTransactions, filter]);
  // Handle filter change
  return (
    <div className="transactions-page w-full h-full flex flex-col flex-1 justify-start">
      {showTransaction.show && (
        <div className="transaction-modal fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="transaction-modal-content bg-white p-4 rounded-lg shadow-lg">
            <button
              className="close-button absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => handleToggleTransaction({} as Transaction)}
            >
              &times;
            </button>
          </div>
        </div>
      )}
      <TransactionHeader setFilter={setFilter} />
      <div className="relative transactions-body w-full h-full flex flex-col items-start justify-start bg-white rounded-lg shadow-md">
        {showTransaction.show && (
          <EditTransaction
            transaction={showTransaction.transaction}
            handleToggleTransaction={handleToggleTransaction}
          />
        )}
        <div className="transaction-header w-full flex items-center justify-between p-2 font-bold text-sm rounded-tl border-black bg-gray-300">
          <p className="flex-1">Due Date</p>
          <p className="flex-2">Name</p>
          <p className="flex-1">Amount</p>
          <p className="flex-1 hidden sm:block">Added by</p>
          <p className="flex-1 hidden sm:block">Pay To</p>
          <p className="flex-1 hidden sm:block">Assigned To</p>
          <p className="flex-1">Status</p>
        </div>
        <div className="transaction-list w-full flex flex-1 flex-col">
          {/* Map through transactions and render them here */}
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TransactionItem
                key={transaction.id}
                transactionProp={transaction}
                handleToggleTransaction={handleToggleTransaction}
              />
            ))
          ) : (
            <p className="text-gray-500">No transactions found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
