import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { UserProps } from "@/types/interfaces/interfaces";
import { InitialUserState } from "@/types/interfaces/slices";

const initialState: InitialUserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export const userReducer = userSlice.reducer;
export const { addUser, removeUser } = userSlice.actions;
