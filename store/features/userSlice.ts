import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  id: string;
  username: string;
  email: string | null;
  budgets: string[]; //Array of Budget Ids
  defaultBudget: Budget | {};
  subscribed: boolean;
  bills: string[]; // Bill[]
  isDemo: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  id: "",
  username: "",
  email: null,
  budgets: [],
  defaultBudget: {},
  subscribed: false,
  bills: [],
  isDemo: false,
  isLoading: false,
};

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (newUser: NewUser, thunkAPI) => {
    try {
      const res = await axios.post("/api/users", newUser, {
        withCredentials: true,
      });
      return res.data.user;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => {
      return initialState;
    },
    demoUser: (state) => {
      state.id = "demo";
      state.username = "Demo User";
      state.email = "demo@example.com";
      state.isDemo = true;
    },
    addBudget: (state, { payload }: { payload: string }) => {
      state.budgets.push(payload);
    },
    setDefaultBudget: (state, { payload }: { payload: Budget }) => {
      state.defaultBudget = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userRegister.fulfilled, (state, { payload }) => {
      console.log("User registered successfully:", payload);
      state.isLoading = false;
      state.id = payload.id;
      state.username = payload.username;
      state.email = payload.email;
      state.budgets = payload.budgets;
      state.defaultBudget = payload.defaultBudget;
      state.subscribed = payload.subscribed;
      state.bills = payload.bills;
      state.isDemo = payload.isDemo;
    });
    builder.addCase(userRegister.rejected, (state, { payload }) => {
      state.isLoading = false;
      console.log("User registration failed:", payload);
    });
  },
});

export const { setUser, clearUser, demoUser, addBudget, setDefaultBudget } =
  userSlice.actions;

export default userSlice.reducer;
