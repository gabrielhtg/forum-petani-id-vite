import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "./services/isLoginSlice.js";

export default configureStore({
  reducer: {
    isLogin: isLoginReducer,
  },
});
