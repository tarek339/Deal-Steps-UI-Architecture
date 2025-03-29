import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { CartActionProps, initalCartState } from "@/types/interfaces/slices";

const initialState: initalCartState = {
  cart: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addCart: (state, action: PayloadAction<CartActionProps>) => {
      state.cart = action.payload.cart;
      state.total += action.payload.total;
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const { addCart } = cartSlice.actions;
