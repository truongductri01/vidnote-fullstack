import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  resetSelectedNote,
  setSelectedNoteVideo,
} from "../../redux/reducers/notes/notesReducer";
import { useNavigate } from "react-router-dom";
import { YouTubeVideoSearchResult } from "../../types/youtubeResponseType";

type VideoSearchCardProps = {
  video: YouTubeVideoSearchResult;
};

function VideoSearchCard({ video }: VideoSearchCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const selectedNote = useAppSelector((state) => state.notes.selectedNote);
  return (
    <div
      className="VideoSearchCar w-full cursor-pointer mb-3 bg-yellow-400 rounded-lg py-2 px-3 flex flex-col sm:flex-row shadow-md shadow-gray-500"
      onClick={() => {
        if (userInfo.id + video.id.videoId !== selectedNote.noteData.id) {
          dispatch(resetSelectedNote());
        }
        dispatch(
          setSelectedNoteVideo({
            ...video,
          })
        );
        navigate(
          `/notes/${userInfo.id + video.id.videoId}?videoId=${video.id.videoId}`
        );
      }}
    >
      <p className="font-bold sm:order-last sm:ml-2">{video.snippet.title}</p>
      <img
        src={video.snippet.thumbnails.medium.url}
        alt=""
        className="rounded-md max-w-[320px]"
      />
    </div>
  );
}

export default VideoSearchCard;
