import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { is } from "date-fns/locale";

interface DemoState {
  budgetName: string;
  owner: string;
  transactions: Transaction[] | [];
  collaborators: string[];
  isLoading: boolean;
}

export const loadFromLocalStorage = createAsyncThunk(
  "demo/loadFromLocalStorage",
  async (_, thunkAPI) => {
    if (typeof window !== "undefined") {
      try {
        const data = localStorage.getItem("demo-state");
        return data ? JSON.parse(data) : undefined;
      } catch (err) {
        console.warn("LocalStorage load failed:", err);
        return thunkAPI.rejectWithValue("Failed to load demo state");
      }
    } else {
      return thunkAPI.rejectWithValue("LocalStorage is not available");
    }
  }
);

const initialState: DemoState = {
  budgetName: "",
  owner: "",
  transactions: [],
  collaborators: [],
  isLoading: false,
};

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFromLocalStorage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadFromLocalStorage.fulfilled, (state, { payload }) => {
        console.log("Demo state loaded:", payload);
        // Set state if payload.transactions exist.
        if (payload.transactions.length !== -1) {
          //   state.transactions = [...payload.transactions];
          let totalIncome = 0;
          let totalExpense = 0;

          for (let transaction of [...payload.transactions]) {
            if (transaction.type === "expense") {
              totalExpense += transaction.amount;
            } else {
              totalIncome += transaction.amount;
            }
          }
        }
        state.isLoading = false;
      })
      .addCase(loadFromLocalStorage.rejected, (state, action) => {
        console.warn("Failed to load demo state:", action.payload);
        state.isLoading = false;
      });
  },
});

export const {} = demoSlice.actions;
export default demoSlice.reducer;
