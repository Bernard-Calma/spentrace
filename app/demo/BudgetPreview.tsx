import { useEffect, useState } from "react";

const BudgetPreview = () => {
  const [budget, setBudget] = useState<Budget>({
    id: "",
    budgetName: "",
    owner: "",
    transactions: [],
    collaborators: [],
    totalIncome: 0,
    totalExpenses: 0,
  });

  const [nextTransactionDue, setNextTransactionDue] =
    useState<Transaction | null>(null);

  useEffect(() => {
    // Fetch budget data from localStorage
    const demo: Demo = JSON.parse(localStorage.getItem("demo") || "{}");
    const localBudget: Budget = demo.defaultBudget || {};
    if (localBudget.id) {
      setBudget({ ...localBudget });
    } else {
      // If no budget exists, redirect to create budget page
      window.location.href = "/demo/create-budget";
    }

    const handleSetNextTransactionDue = () => {
      const today = new Date();
      const upcomingTransactions = localBudget.transactions.filter(
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
    <div className="budget-preview text-sm flex flex-1 flex-col shadow-md rounded-lg pb-4">
      <h2 className="text-lg font-bold">{budget.budgetName}</h2>
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
