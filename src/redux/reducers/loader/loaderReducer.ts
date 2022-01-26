import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface LoaderState {
  isLoading: boolean;
}

// Define the initial state using that type
const initialState: LoaderState = {
  isLoading: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setLoader(state, actions: PayloadAction<boolean>) {
      state.isLoading = actions.payload;
    },
  },
});

export const { setLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
