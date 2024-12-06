import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    value: {
      foto_profil: "https://github.com/shadcn.png",
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.value = action.payload;
    },
    clearUserData: (state) => {
      state.value = {};
    },
  },
});

export const { setUserData, clearUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
