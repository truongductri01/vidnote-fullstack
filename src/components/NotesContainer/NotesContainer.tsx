import React, { useEffect } from "react";
import { getAllNotesBackend } from "../../apis/noteApis";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoader } from "../../redux/reducers/loader/loaderReducer";
import { setNotes } from "../../redux/reducers/notes/notesReducer";
import { setToastError } from "../../redux/reducers/toast/toastReducer";
import { NoteData } from "../../types/noteFetchingDataType";
import NoteCard from "../NoteCard/NoteCard";

function NotesContainer() {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.notes.notes);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const authInfo = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (notes.length != userInfo.notesId.length) {
      dispatch(setLoader(true));
      getAllNotesBackend(authInfo.accessToken)
        .then((notesList) => {
          dispatch(setNotes(notesList));
          dispatch(setLoader(false));
        })
        .catch((e) => {
          dispatch(setLoader(false));
          dispatch(setToastError("" + e));
        });
    }
  }, [userInfo]);
  return (
    <div className="NotesContainer w-full h-full flex-grow flex-shrink-0 p-2 overflow-auto flex flex-wrap">
      {notes.map((noteData: NoteData) => (
        <NoteCard noteData={noteData} key={noteData.id} />
      ))}
    </div>
  );
}

export default NotesContainer;
