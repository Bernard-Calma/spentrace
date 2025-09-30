import { configureStore } from "@reduxjs/toolkit";
import { loadDemoState } from "@/utils/localStorage";

import userReducer from "./features/userSlice";
import demoReducer from "./features/demoSlice";
import budgetReducer from "./features/budgetSlice";

const preloadedState = {
  // If no demo state exists in localStorage, initialize with an empty demo state
  demo: loadDemoState() || {
    id: "",
    budgetName: "",
    owner: "",
    totalIncome: 0,
    totalExpenses: 0,
    history: [],
    transactions: [],
    bills: [],
    collaborators: [],
    isLoading: false,
  },
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    demo: demoReducer,
    budget: budgetReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Whenever the store changes, save the demo state to localStorage
store.subscribe(() => {
  const state = store.getState();
  // console.log("Store.subscribe: ", state);
  localStorage.setItem("demo-state", JSON.stringify(state.demo));
});
