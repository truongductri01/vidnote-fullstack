import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface ToastState {
  toastInfo: {
    hasToast: boolean;
    type: "success" | "info" | "warning" | "error";
    message: string;
  };
}

// Define the initial state using that type
const initialState: ToastState = {
  toastInfo: {
    hasToast: false,
    type: "info",
    message: "",
  },
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, actions) => {
      state.toastInfo = actions.payload;
    },
    resetToast: (state) => {
      state.toastInfo = {
        hasToast: false,
        type: "info",
        message: "",
      };
    },
  },
});

export const { setToast, resetToast } = toastSlice.actions;
export default toastSlice.reducer;
