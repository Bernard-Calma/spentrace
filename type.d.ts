interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

interface Budget {
  id: string;
  budgetName: string;
  owner: string;
  transactions: Transaction[];
  collaborators: string[];
  totalIncome: number;
  totalExpenses: number;
}

interface Demo {
  user: string;
  budgets: Budget[];
  defaultBudget: Budget;
}
