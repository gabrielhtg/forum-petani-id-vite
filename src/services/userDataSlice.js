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
  },
});

export const { setUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
