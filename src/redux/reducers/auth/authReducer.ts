import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface AuthState {
  accessToken: string;
  isSignIn: boolean;
  uid: string;
}

// Define the initial state using that type
const initialState: AuthState = {
  accessToken: "",
  isSignIn: false,
  uid: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, actions: PayloadAction<AuthState>) {
      state.accessToken = actions.payload.accessToken;
      state.isSignIn = actions.payload.isSignIn;
      state.uid = actions.payload.uid;
    },
    clearAuth(state) {
      state.accessToken = "";
      state.isSignIn = false;
      state.uid = "";
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
