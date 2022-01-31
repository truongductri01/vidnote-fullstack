import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedNote } from "../../redux/reducers/notes/notesReducer";
import { NoteData } from "../../types/noteFetchingDataType";

function NoteCard({ noteData }: { noteData: NoteData }) {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const selectedNote = useAppSelector((state) => state.notes.selectedNote);
  const dispatch = useAppDispatch();
  return (
    <div
      className="NoteCard w-full h-max border-2 border-yellow-500 bg-gray-100 rounded-md cursor-pointer mb-4 hover:bg-yellow-100 shadow-md shadow-gray-500 p-2 box-border flex flex-col sm:flex-row last:mb-0"
      key={noteData.id}
      onClick={() => {
        if (
          selectedNote.noteData.videoId &&
          noteData.videoId !== selectedNote.noteData.videoId
        ) {
          dispatch(setSelectedNote({ noteData: { ...noteData }, video: null }));
        } else {
          dispatch(
            setSelectedNote({ ...selectedNote, noteData: { ...noteData } })
          );
        }
        navigate(
          `/notes/${userInfo.id + noteData.videoId}?videoId=${noteData.videoId}`
        );
      }}
    >
      <img
        className="rounded-md flex-shrink-0 max-w-[320px]"
        src={noteData.video.url as any}
        alt=""
      />
      <p
        className="flex-grow font-bold text-ellipsis overflow-hidden whitespace-nowrap sm:ml-2 sm:whitespace-normal"
        dangerouslySetInnerHTML={{ __html: noteData.video.title as string }}
      ></p>
    </div>
  );
}

export default NoteCard;
