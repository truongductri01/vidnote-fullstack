import { getIdTokenLocalStorage } from "../helpers/localStorageUtils";
import { NoteData } from "../types/noteFetchingDataType";
import { apiURL, baseURL } from "./routes";

export const noteRoutes = {
  getAll: apiURL + "/notes/all",
  getSingle: (noteId: string) => {
    return apiURL + "/notes?id=" + noteId;
  },
  postPutSetSingle: apiURL + "/notes/set-note",
  putUpdateSingle: apiURL + "/notes/update-note",
};
const getAllNotes = async (authorizationToken: string) => {
  if (authorizationToken) {
    let data = await fetch(baseURL + noteRoutes.getAll);
  }
};
const getNoteById = async (noteId: string | null | undefined) => {
  let idToken = getIdTokenLocalStorage();
  if (idToken && noteId) {
    let authorizationToken = "Bearer " + idToken;
    return await fetch(baseURL + noteRoutes.getSingle(noteId), {
      headers: {
        Authorization: authorizationToken,
      },
    })
      .then((res) => res.json())
      .then((data) => data);
  }
  return null;
};

const setNoteBackend = async (noteData: NoteData) => {
  let idToken = getIdTokenLocalStorage();
  if (idToken) {
    let authorizationToken = "Bearer " + idToken;
    let res = await fetch(baseURL + noteRoutes.postPutSetSingle, {
      method: "POST",
      headers: {
        Authorization: authorizationToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    }).then((res) => res);
    return res.ok;
  }
  return false;
};
export { getAllNotes, getNoteById, setNoteBackend };
