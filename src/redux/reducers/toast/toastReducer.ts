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
    setToastSuccess: (state, actions: { payload: string; type: string }) => {
      state.toastInfo = {
        hasToast: true,
        type: "success",
        message: actions.payload,
      };
    },
    setToastError: (state, actions: { payload: string; type: string }) => {
      state.toastInfo = {
        hasToast: true,
        type: "error",
        message: actions.payload,
      };
    },
    setToastInfo: (state, actions: { payload: string; type: string }) => {
      state.toastInfo = {
        hasToast: true,
        type: "info",
        message: actions.payload,
      };
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

export const { resetToast, setToastSuccess, setToastError, setToastInfo } =
  toastSlice.actions;
export default toastSlice.reducer;
