import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BudgetState {
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

const initialState: BudgetState = {
  id: "",
  budgetName: "",
  owner: "",
  transactions: [],
  bills: [],
  history: [],
  collaborators: [],
  totalIncome: 0,
  totalExpenses: 0,
  isLoading: false,
};

export const budgetSlice = createSlice({
  name: "budget",
  initialState,
  reducers: {
    setBudget: (state, action: PayloadAction<BudgetState>) => {
      return { ...state, ...action.payload };
    },
    clearBudget: () => {
      return initialState;
    },
  },
});

export const { setBudget, clearBudget } = budgetSlice.actions;

export default budgetSlice.reducer;
