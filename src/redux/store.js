import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./reducers/counter/counterSlice";
import notesReducer from "./reducers/notes/notesReducer";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    notesReducer,
  },
});

export default store;
