import { config } from "../config/config";
import { NoteData } from "../types/noteFetchingDataType";

const { baseURL, apiURL } = config.app;

export const noteRoutes = {
  getAll: apiURL + "/notes/all",
  getSingle: (noteId: string) => {
    return apiURL + "/notes?id=" + noteId;
  },
  getSinglePublic: (noteId: string) => {
    return apiURL + "/notes/public?id=" + noteId;
  },
  postPutSetSingle: apiURL + "/notes/set-note",
  putUpdateSingle: apiURL + "/notes/update-note",
  putSingleStatus: apiURL + "/notes/note-state",
  deleteNote: (noteId: string) => apiURL + "/notes?id=" + noteId,
};
const getAllNotesBackend = async (idToken: string) => {
  if (idToken) {
    let data = await fetch(baseURL + noteRoutes.getAll, {
      headers: { Authorization: "Bearer " + idToken },
    })
      .then((res) => res.json())
      .then((notesList) => notesList);
    return data;
  }
  return null;
};
const getNoteById = async (
  noteId: string | null | undefined,
  idToken: string
) => {
  if (idToken && noteId) {
    let authorizationToken = "Bearer " + idToken;
    return await fetch(baseURL + noteRoutes.getSingle(noteId), {
      headers: {
        Authorization: authorizationToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("New Note found");
        }
      })
      .then((data) => data)
      .catch((e) => {
        return null;
      });
  }
  return null;
};

const setNoteBackend = async (noteData: NoteData, idToken: string) => {
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
const updateNoteStatus = async (
  noteId: string | null | undefined,
  newStatus: "public" | "private",
  authorId: string,
  idToken: string
) => {
  return await fetch(baseURL + noteRoutes.putSingleStatus, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + idToken,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      noteId,
      newStatus,
      authorId,
    }),
  });
};
const getPublicNoteById = async (noteId: string) => {
  let data = await fetch(baseURL + noteRoutes.getSinglePublic(noteId))
    .then((res) => res.json())
    .then((noteData) => noteData);
  return data;
};
const deleteNoteById = async (noteId: string, idToken: string) => {
  return fetch(baseURL + noteRoutes.deleteNote(noteId), {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + idToken,
      "Content-type": "application/json",
    },
    body: "",
  });
};
export {
  getAllNotesBackend,
  getNoteById,
  setNoteBackend,
  updateNoteStatus,
  getPublicNoteById,
  deleteNoteById,
};
