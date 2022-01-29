import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { NoteData } from "../../types/noteFetchingDataType";

function NoteCard({ noteData }: { noteData: NoteData }) {
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  return (
    <div
      className="NoteCard w-full h-max shadow-2xl border-2 border-yellow-500 bg-gray-100 rounded-md cursor-pointer mb-3 hover:bg-gray-200 hover:scale-[1.02] md:hover:scale-[1.01] p-2 box-border"
      key={noteData.id}
      onClick={() => {
        navigate(
          `/notes/${userInfo.id + noteData.videoId}?videoId=${noteData.videoId}`
        );
      }}
    >
      <img className="rounded-md" src={noteData.video.url as any} alt="" />
      <p className=" text-ellipsis overflow-hidden whitespace-nowrap">
        {noteData.video.title}
      </p>
    </div>
  );
}

export default NoteCard;
