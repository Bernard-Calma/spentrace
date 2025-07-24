interface Transaction {
  id: string;
  name: string;
  amount: number;
  date: string;
  category?: string;
  type: "income" | "expense";
  assignedTo: string; // Optional field to assign the transaction to a specific user
  notes?: string;
  addedBy?: string; // Optional field to track who added the transaction
  status?: "pending" | "completed" | "cancelled"; // Optional field to track transaction status
  payTo?: string; // Optional field to specify who the transaction was paid to
}

interface Budget {
  id: string;
  budgetName: string;
  owner: string;
  transactions: Transaction[];
  history: Transaction[]; // History of transactions for the budget
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
