interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category?: string;
  type: "income" | "expense";
  notes?: string;
}

interface Budget {
  id: string;
  budgetName: string;
  owner: string;
  transactions: Transaction[];
  collaborators: string[];
  totalIncome: number;
  totalExpenses: number;
  isLoading?: boolean;
}

interface Demo {
  user: string;
  budgets: Budget[];
  defaultBudget: Budget;
}
