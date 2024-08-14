import { configureStore } from "@reduxjs/toolkit";
import shipmentsSlice from "./features/shipmentsSlice";
import userSlice from "./features/activeUserSlice";
export const store = configureStore({
  reducer: {
    shipmentsSlice,
    userSlice
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
