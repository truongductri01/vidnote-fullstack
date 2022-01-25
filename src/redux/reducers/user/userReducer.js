import { createSlice } from "@reduxjs/toolkit";

const userReducer = createSlice({
  name: "user",
  initialState: { userInfo: null },
  reducers: {
    setUserInfo(state, actions) {
      state.userInfo = actions.payload;
    },
    removeUserInfo(state) {
      state.userInfo = null;
    },
  },
});

export const { setUserInfo, removeUserInfo } = userReducer.actions;
export default userReducer.reducer;
