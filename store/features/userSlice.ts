import { createSlice } from "@reduxjs/toolkit";

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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
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
});

export const { demoUser, addBudget, setDefaultBudget } = userSlice.actions;

export default userSlice.reducer;
