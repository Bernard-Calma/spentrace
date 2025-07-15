import { configureStore } from "@reduxjs/toolkit";
import { loadDemoState } from "@/utils/localStorage";

import userReducer from "./features/userSlice";
import demoReducer from "./features/demoSlice";

const preloadedState = {
  demo: loadDemoState(),
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
