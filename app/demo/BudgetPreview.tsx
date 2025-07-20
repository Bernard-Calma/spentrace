import { useEffect, useState } from "react";

const BudgetPreview = ({ budget }: { budget: Budget }) => {
  const [nextTransactionDue, setNextTransactionDue] =
    useState<Transaction | null>(null);

  useEffect(() => {
    // Fetch budget data from localStorage

    const handleSetNextTransactionDue = () => {
      const today = new Date();
      const upcomingTransactions = budget.transactions.filter(
        (transaction) => new Date(transaction.date) > today
      );
      if (upcomingTransactions.length > 0) {
        const nextTransaction = upcomingTransactions.reduce((prev, curr) =>
          new Date(prev.date) < new Date(curr.date) ? prev : curr
        );
        setNextTransactionDue(nextTransaction);
      } else {
        setNextTransactionDue(null);
      }
    };
    handleSetNextTransactionDue();
  }, []);
  return (
    <div className="budget-preview relative w-full h-full text-xs flex flex-1 flex-col bg-gray-100 shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold">{budget.budgetName}</h2>
      <p className="absolute top-2 right-2 text-gray-600 text-md hover:underline cursor-pointer">
        View
      </p>
      <div className="next-transaction_due ">
        {nextTransactionDue ? (
          <div className="next-transaction flex flex-col">
            <h3 className="text-md font-semibold">Next Transaction Due:</h3>
            <p>
              {nextTransactionDue.name} -{" "}
              {new Date(nextTransactionDue.date).toLocaleDateString()} - $
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
