import { createSlice } from "@reduxjs/toolkit";

type RedirectState = {
  hasRedirect: boolean;
  property: {
    type: "note" | string;
    videoId: string;
  };
};

// Define the initial state using that type
const initialState: RedirectState = {
  hasRedirect: false,
  property: {
    type: "note",
    videoId: "",
  },
};

export const redirectSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setRedirect(state, actions) {
      state.hasRedirect = true;
      state.property = { ...state.property, ...actions.payload };
    },
    resetRedirect: (state) => {
      state.hasRedirect = false;
      state.property = {
        type: "note",
        videoId: "",
      };
    },
  },
});

export const { resetRedirect, setRedirect } = redirectSlice.actions;
export default redirectSlice.reducer;
