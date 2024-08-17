import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Order = {
  id: string;
  hash: string;
};

type OrdersState = {
  orders: Order[];
};

const initialState: OrdersState = {
  orders: [],
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrderHash: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload);
    },
  },
});

export const { addOrderHash } = orderSlice.actions;
export default orderSlice.reducer;
