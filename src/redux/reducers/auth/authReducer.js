import { createSlice } from "@reduxjs/toolkit";

const authReducer = createSlice({
  name: "auth",
  initialState: {
    idToken: null,
  },
  reducers: {
    setIdToken(state, actions) {
      state.idToken = actions.payload;
    },
    clearIdToken(state) {
      state.idToken = null;
    },
  },
});

export const { setIdToken, clearIdToken } = authReducer.actions;
export default authReducer.reducer;
