import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  id: string;
  username: string;
  email: string | null;
  budgets: Budget[];
}

const initialState: UserState = {
  id: "",
  username: "",
  email: null,
  budgets: [],
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
