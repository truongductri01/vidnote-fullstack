import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo } from "../../../types/userTypes";

let initialState: { userInfo: UserInfo } = {
  userInfo: {
    id: "",
    firstName: "",
    lastName: "",
    searchable: true,
    avatarUrl: "",
    notesId: [],
  },
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, actions: PayloadAction<any>) {
      state.userInfo = actions.payload;
    },
    removeUserInfo(state) {
      state.userInfo = {
        id: "",
        firstName: "",
        lastName: "",
        searchable: true,
        avatarUrl: "",
        notesId: [],
      };
    },
  },
});

export const { setUserInfo, removeUserInfo } = userReducer.actions;
export default userReducer.reducer;
