import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  username: string;
  email: string | null;
  budgets: Budget[];
  defaultBudget: Budget | {};
  subscribed: boolean;
  bills: string[]; // Bill[]
  demo: boolean;
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
  demo: false,
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
    },
  },
});

export const { demoUser } = userSlice.actions;

export default userSlice.reducer;
