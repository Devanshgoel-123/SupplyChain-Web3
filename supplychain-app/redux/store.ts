import { configureStore } from "@reduxjs/toolkit";
import shipmentsSlice from "./features/shipmentsSlice";
import userSlice from "./features/activeUserSlice";
import OrderSlice from "./features/OrderSlice";
export const store = configureStore({
  reducer: {
    shipmentsSlice,
    userSlice,
    OrderSlice
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
