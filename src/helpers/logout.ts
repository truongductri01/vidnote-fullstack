import { logOut } from "../firebase/auth";
import { resetNotes } from "../redux/reducers/notes/notesReducer";
import { removeUserInfo } from "../redux/reducers/user/userReducer";

export async function logOutAndClearData(dispatch: any) {
  await logOut();
  dispatch(removeUserInfo());
  dispatch(resetNotes());
}
