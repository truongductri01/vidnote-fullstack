import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authReducer";
import loaderReducer from "./reducers/loader/loaderReducer";
import notesReducer from "./reducers/notes/notesReducer";
const store = configureStore({
  reducer: {
    notesReducer,
    loader: loaderReducer,
    auth: authReducer,
  },
});

export default store;
