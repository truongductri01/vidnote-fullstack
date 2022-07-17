import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authReducer";
import loaderReducer from "./reducers/loader/loaderReducer";
import notesReducer from "./reducers/notes/notesReducer";
import redirectReducer from "./reducers/redirect/redirectReducer";
import toastReducer from "./reducers/toast/toastReducer";
import userReducer from "./reducers/user/userReducer";

const store = configureStore({
  reducer: {
    loader: loaderReducer,
    notes: notesReducer,
    user: userReducer,
    toast: toastReducer,
    redirect: redirectReducer,
    auth: authReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export default store;
