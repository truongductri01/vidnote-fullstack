import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter/counterSlice";
import loaderReducer from "./reducers/loader/loaderReducer";
import notesReducer from "./reducers/notes/notesReducer";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    notesReducer,
    loader: loaderReducer,
  },
});

export default store;
