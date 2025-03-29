import { configureStore } from "@reduxjs/toolkit";

import { cartReducer, userReducer } from "./slices";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
