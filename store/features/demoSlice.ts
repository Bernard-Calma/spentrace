import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

const initialState: Budget = {
  id: "",
  budgetName: "",
  owner: "",
  totalIncome: 0,
  totalExpenses: 0,
  transactions: [],
  history: [],
  collaborators: [],
  isLoading: false,
};

export const loadFromLocalStorage = createAsyncThunk(
  "demo/loadFromLocalStorage",
  (_, thunkAPI) => {
    // console.log("Loading demo state from localStorage...");
    if (typeof window !== "undefined") {
      // console.log("LocalStorage is available.");
      try {
        const data = localStorage.getItem("demo-state");
        // console.log("LocalStorage data:", data);
        return data ? JSON.parse(data) : undefined;
      } catch (err: any) {
        // console.log("LocalStorage load failed:", err);
        return thunkAPI.rejectWithValue(
          err.message || "Failed to load demo state"
        );
      }
    } else {
      // console.log("LocalStorage is not available in this environment.");
      return thunkAPI.rejectWithValue("LocalStorage is not available");
    }
  }
);

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {
    createBudget: (state, action: PayloadAction<Budget>) => {
      // console.log("Creating budget:", action.payload);
      const newBudget = action.payload;
      state.id = newBudget.id;
      state.budgetName = newBudget.budgetName;
      state.owner = newBudget.owner;
      state.transactions = newBudget.transactions || [];
      state.collaborators = newBudget.collaborators || [];
      state.totalIncome = newBudget.totalIncome || 0;
      state.totalExpenses = newBudget.totalExpenses || 0;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      // console.log("Adding transaction:", action.payload);
      const newTransaction = action.payload;
      state.transactions.push(newTransaction);
      state.totalExpenses +=
        newTransaction.type === "expense" ? newTransaction.amount : 0;
      state.totalIncome +=
        newTransaction.type === "income" ? newTransaction.amount : 0;
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      // console.log("Deleting transaction with id:", action.payload);
      const transactionId = action.payload;
      // Update totalIncome and totalExpenses before deletion
      const deletedTransaction = state.transactions.find(
        (transaction) => transaction.id === transactionId
      );
      if (deletedTransaction) {
        if (deletedTransaction.type === "expense") {
          state.totalExpenses -= deletedTransaction.amount;
        } else {
          state.totalIncome -= deletedTransaction.amount;
        }
      }
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== transactionId
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadFromLocalStorage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadFromLocalStorage.fulfilled, (state, { payload }) => {
        // console.log("Demo state loaded:", payload);
        // Set state if payload.transactions exist.
        state.budgetName = payload.budgetName;
        state.owner = payload.owner;
        // Change all transaction amounts to numbers if they are strings
        state.transactions =
          payload.transactions.map((transaction: any) => ({
            ...transaction,
            amount:
              typeof transaction.amount === "string"
                ? parseFloat(transaction.amount)
                : transaction.amount,
          })) || [];
        state.isLoading = false;
      })
      .addCase(loadFromLocalStorage.rejected, (state, action) => {
        console.log(
          "Failed to load demo state:",
          action.payload || action.error.message
        );
        state.isLoading = false;
      });
  },
});

export const { createBudget, addTransaction, deleteTransaction } =
  demoSlice.actions;
export default demoSlice.reducer;
