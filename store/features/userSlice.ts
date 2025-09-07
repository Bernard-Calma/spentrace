import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    delete newUser.verifyPassword;
    try {
      const res = await axios({
        method: "POST",
        url: `api/users`,
        data: newUser,
        withCredentials: true,
      });
      return res.data.user;
    } catch (err: any) {
      // console.log("Registration Error: ", err);
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

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
