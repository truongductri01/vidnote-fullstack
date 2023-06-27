import { logOut } from "../firebase/auth";
import { clearAuth } from "../redux/reducers/auth/authReducer";
import { resetNotes } from "../redux/reducers/notes/notesReducer";
import { removeUserInfo } from "../redux/reducers/user/userReducer";
import { persistStore } from "redux-persist";
import store from "../redux/store";

export async function logOutAndClearData(dispatch: any) {
    await logOut();
    dispatch(removeUserInfo());
    dispatch(resetNotes());
    dispatch(clearAuth());
    // clear store
    persistStore(store).purge();
}
