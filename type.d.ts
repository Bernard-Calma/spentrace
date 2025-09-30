type repeat = "one-time" | "daily" | "weekly" | "bi-weekly" | "monthly";

interface Transaction {
  id: string;
  name: string;
  amount: number;
  runningTotal?: number;
  date: string;
  category?: string;
  type: "income" | "expense";
  assignedTo: string; // Optional field to assign the transaction to a specific user
  notes?: string;
  addedBy?: string; // Optional field to track who added the transaction
  status?: "pending" | "sent" | "paid" | "cancelled"; // Optional field to track transaction status
  payTo?: string; // Optional field to specify who the transaction was paid to
}

interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category?: string;
  paid: boolean;
  notes?: string;
  repeat?: repeat;
  endRepeat?: string | null; // null means no end date
}

interface Budget {
  id: string;
  budgetName: string;
  owner: string;
  transactions: Transaction[];
  bills: Bill[];
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

interface AppUser {
  credentials?: Record<string, CredentialInput>;
  id: string;
  username: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  bills: Bill[];
  budgets: string[]; // Array of Budget Ids
  defaultBudget: string; // Budget Id
  subscribed: string; // Stripe Customer ID
}

interface NewUser {
  username: string;
  email: string;
  password: string;
  verifyPassword?: string;
}

type TransactionStatus = "pending" | "sent" | "paid" | "cancelled";
type TransactionFilters = TransactionStatus | "all" | "completed";
type TransactionType = "income" | "expense";
type TransactionSort = {
  field: "date" | "amount" | "name" | "status";
  order: "asc" | "desc";
};
