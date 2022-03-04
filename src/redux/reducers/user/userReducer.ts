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
    removeUserInfo(state) {
      state.userInfo = { ...initialState.userInfo };
    },
    removeNoteIdFromUser(state, actions: PayloadAction<string>) {
      let newNotesId: string[] = [];
      const noteId = actions.payload;
      state.userInfo.notesId.forEach((id) => {
        id !== noteId && newNotesId.push(id);
      });
      state.userInfo = { ...state.userInfo, notesId: [...newNotesId] };
    },
    setUserInfo(state, actions: PayloadAction<any>) {
      state.userInfo = actions.payload;
    },
  },
});

export const { removeUserInfo, removeNoteIdFromUser, setUserInfo } =
  userReducer.actions;
export default userReducer.reducer;
