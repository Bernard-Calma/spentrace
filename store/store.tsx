import { configureStore } from "@reduxjs/toolkit";
import { loadDemoState } from "@/utils/localStorage";

import userReducer from "./features/userSlice";
import demoReducer from "./features/demoSlice";

const preloadedState = {
  // If no demo state exists in localStorage, initialize with an empty demo state
  demo: loadDemoState() || {
    budgetName: "",
    owner: "",
    transactions: [],
    collaborators: [],
    isLoading: false,
  },
};

export const store = configureStore({
  reducer: {
    user: userReducer,
    demo: demoReducer,
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
