import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface DemoState {
  budgetName: string;
  owner: string;
  transactions: Transaction[] | [];
  collaborators: string[];
  isLoading: boolean;
}

const initialState: DemoState = {
  budgetName: "",
  owner: "",
  transactions: [],
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
  reducers: {},
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
        state.transactions = payload.transactions || [];
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

export const {} = demoSlice.actions;
export default demoSlice.reducer;
