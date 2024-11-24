import { createSlice } from "@reduxjs/toolkit";

export const isLoginSlice = createSlice({
  name: "isLogin",
  initialState: {
    value: false,
  },
  reducers: {
    loggedIn: (state) => {
      state.value = true;
    },
    notLoggedIn: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loggedIn, notLoggedIn } = isLoginSlice.actions;

export default isLoginSlice.reducer;
