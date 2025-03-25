import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UserProps } from "@/types/interfaces/interfaces";
import { InitialUserState } from "@/types/interfaces/slices";

const initialState: InitialUserState = {
  user: null,
  loading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
      state.loading = false;
    },
    removeUser: (state) => {
      state.user = null;
      state.loading = false;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
