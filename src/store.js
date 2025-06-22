import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import editorReducer from "./features/editor/editorSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    editor: editorReducer,
  },
});

export default store;
