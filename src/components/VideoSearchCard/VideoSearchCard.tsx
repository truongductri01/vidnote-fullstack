import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedNote } from "../../redux/reducers/notes/notesReducer";
import { useNavigate } from "react-router-dom";
import { YouTubeVideoSearchResult } from "../../types/youtubeResponseType";

type VideoSearchCardProps = {
  video: YouTubeVideoSearchResult;
};

function VideoSearchCard({ video }: VideoSearchCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector((state) => state.user.userInfo);
  return (
    <div
      className="VideoSearchCar w-full cursor-pointer mb-3 bg-yellow-400 rounded-lg py-2 px-3"
      onClick={() => {
        dispatch(
          setSelectedNote({
            id: userInfo.id + video.id.videoId,
            video: video,
          })
        );
        navigate(
          `/notes/${userInfo.id + video.id.videoId}?videoId=${video.id.videoId}`
        );
      }}
    >
      <h3>{video.snippet.title}</h3>
      <img src={video.snippet.thumbnails.medium.url} alt="" />
    </div>
  );
}

export default VideoSearchCard;
