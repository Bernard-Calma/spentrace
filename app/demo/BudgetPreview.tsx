"use client";

import { format } from "date-fns";
import { useEffect, useState } from "react";

const BudgetPreview = ({ budget }: { budget: Budget }) => {
  const [nextTransactionDue, setNextTransactionDue] =
    useState<Transaction | null>(null);

  useEffect(() => {
    // Find the next transaction due date
    const upcomingTransactions = budget.transactions.filter(
      (transaction) => new Date(transaction.date) > new Date()
    );
    if (upcomingTransactions.length > 0) {
      const sortedTransactions = upcomingTransactions.sort((a, b) =>
        new Date(a.date) < new Date(b.date) ? -1 : 1
      );
      setNextTransactionDue(sortedTransactions[0]);
    }
  }, [budget.transactions]);

  return (
    <div className="budget-preview relative w-full h-full text-xs flex flex-1 flex-col bg-gray-100 shadow-md rounded-lg p-4">
      <h2 className="text-5xl font-bold">{budget.budgetName}</h2>
      <p className="absolute top-2 right-2 text-gray-600 text-md hover:underline cursor-pointer">
        View Budget
      </p>
      <div className="total-transactions text-2xl font-semibold mb-2">
        <p>
          Number of transactions: <span>{budget.transactions.length}</span>
        </p>
      </div>
      <div className="next-transaction_due text-sm text-gray-700">
        {nextTransactionDue ? (
          <div className="next-transaction flex flex-col">
            <h3 className="text-md font-semibold text-red-600">
              {/* Show remaining days until due date */}
              Next Transaction Due{" "}
              {`(${Math.ceil(
                (new Date(nextTransactionDue.date).getTime() -
                  new Date().getTime()) /
                  (1000 * 60 * 60 * 24) || 0
              )} days)`}
              :
            </h3>
            <p className="text-xl">
              {nextTransactionDue.name} -{" "}
              {format(nextTransactionDue.date, "MMMM dd")} - $
              {nextTransactionDue.amount}
            </p>
          </div>
        ) : (
          <p>No upcoming transactions.</p>
        )}
      </div>
    </div>
  );
};

export default BudgetPreview;
