import { configureStore } from "@reduxjs/toolkit";
import isLoginReducer from "./services/isLoginSlice.js";
import postReducer from "./services/postsSlice.js";
import userDataReducer from "./services/userDataSlice.js";

export default configureStore({
  reducer: {
    isLogin: isLoginReducer,
    posts: postReducer,
    userData: userDataReducer,
  },
});
