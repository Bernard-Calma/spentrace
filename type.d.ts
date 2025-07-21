interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category?: string;
  type: "income" | "expense";
  notes?: string;
  addedBy?: string; // Optional field to track who added the transaction
  status?: "pending" | "completed" | "cancelled"; // Optional field to track transaction status
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
