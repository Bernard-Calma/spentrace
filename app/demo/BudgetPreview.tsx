"use client";

import {
  differenceInDays,
  format,
  isAfter,
  isEqual,
  parse,
  parseISO,
} from "date-fns";
import { useEffect, useState } from "react";

const BudgetPreview = ({ budget }: { budget: Budget }) => {
  const [nextTransactionDue, setNextTransactionDue] =
    useState<Transaction | null>(null);

  useEffect(() => {
    // Get the earliest transaction
    const earliestTransaction = budget.transactions.reduce(
      (earliest: Transaction | null, transaction: Transaction) => {
        if (!earliest || new Date(transaction.date) < new Date(earliest.date)) {
          return transaction;
        }
        return earliest;
      },
      null
    );
    setNextTransactionDue(earliestTransaction);
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
              {
                //If overdue show warning
                isEqual(
                  format(parseISO(nextTransactionDue.date), "yyyy-MM-dd"),
                  format(new Date(), "yyyy-MM-dd")
                )
                  ? "Due Today"
                  : differenceInDays(
                      parseISO(nextTransactionDue.date),
                      parseISO(format(new Date(), "yyyy-MM-dd"))
                    ) === 1
                  ? "Due Tomorrow."
                  : isAfter(parseISO(nextTransactionDue.date), new Date())
                  ? `Due in ${differenceInDays(
                      parseISO(nextTransactionDue.date),
                      parseISO(format(new Date(), "yyyy-MM-dd"))
                    )} days`
                  : "Overdue"
              }
            </h3>
            <p className="text-xl">
              {nextTransactionDue.name} -{" "}
              {format(parseISO(nextTransactionDue.date), "MMMM dd")} - $
              {nextTransactionDue.amount.toFixed(2)}
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
