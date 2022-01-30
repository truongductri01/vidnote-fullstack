import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedNote } from "../../redux/reducers/notes/notesReducer";
import { NoteData } from "../../types/noteFetchingDataType";

function NoteCard({ noteData }: { noteData: NoteData }) {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const dispatch = useAppDispatch();
  return (
    <div
      className="NoteCard w-full h-max shadow-2xl border-2 border-yellow-500 bg-gray-100 rounded-md cursor-pointer mb-3 hover:bg-gray-200 hover:scale-[1.02] md:hover:scale-[1.01] p-2 box-border flex flex-col sm:flex-row"
      key={noteData.id}
      onClick={() => {
        dispatch(setSelectedNote({ ...noteData, video: null }));
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
      <p className="flex-grow font-bold text-ellipsis overflow-hidden whitespace-nowrap sm:ml-2 sm:whitespace-normal">
        {noteData.video.title}
      </p>
    </div>
  );
}

export default NoteCard;
