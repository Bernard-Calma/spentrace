import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadFromLocalStorage = createAsyncThunk(
  "demo/loadFromLocalStorage",
  async (_, thunkAPI) => {
    try {
      const data = localStorage.getItem("demo-state");
      return data ? JSON.parse(data) : undefined;
    } catch (err) {
      console.warn("LocalStorage load failed:", err);
      return thunkAPI.rejectWithValue("Failed to load demo state");
    }
  }
);

const initialState = {
  budgetName: "",
  owner: "",
  budgetItems: [],
  billItems: [],
  totalIncome: 0,
  totalExpense: 0,
  balance: 0,
  openTransaction: {},
  isLoading: true,
};

const demoSlice = createSlice({
  name: "demo",
  initialState,
  reducers: {},
});

export const {} = demoSlice.actions;
export default demoSlice.reducer;
