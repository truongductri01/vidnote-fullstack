import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth/authReducer";
import loaderReducer from "./reducers/loader/loaderReducer";
import notesReducer from "./reducers/notes/notesReducer";
import redirectReducer from "./reducers/redirect/redirectReducer";
import toastReducer from "./reducers/toast/toastReducer";
import userReducer from "./reducers/user/userReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["notes", "user", "auth", "redirect"],
};
const store = configureStore({
    reducer: persistReducer(
        persistConfig,
        combineReducers({
            loader: loaderReducer,
            notes: notesReducer,
            user: userReducer,
            toast: toastReducer,
            redirect: redirectReducer,
            auth: authReducer,
        })
    ),
    devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
