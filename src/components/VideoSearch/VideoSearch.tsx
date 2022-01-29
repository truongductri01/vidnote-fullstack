import React, { useState } from "react";
import { fetchYoutubeBackend } from "../../apis/youtubeApis";
import { defaultSearchResultLength } from "../../constants";
import { useAppDispatch } from "../../redux/hooks";
import { setLoader } from "../../redux/reducers/loader/loaderReducer";
import { primaryButtonStyleClassName } from "../../styles/buttonStyles";
import { primaryInputStyleClassName } from "../../styles/inputStyles";
import { YouTubeVideoSearchResult } from "../../types/youtubeResponseType";
import VideoSearchCard from "../VideoSearchCard/VideoSearchCard";

function VideoSearch(props: any) {
  const [videos, setVideos] = useState([]);
  const [keyword, setKeyword] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(setLoader(true));
    fetchYoutubeBackend(keyword, defaultSearchResultLength)
      .then((data) => {
        dispatch(setLoader(false));
        setVideos(data.items);
      })
      .catch((err: any) => dispatch(setLoader(false)));
  };

  return (
    <div className="VideoSearch relative flex-grow w-full flex flex-col items-center overflow-y-auto">
      <form
        className="VideoSearch__form w-full bg-gray-50 h-[40px] flex-shrink-0 flex"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input
          type="text"
          className={primaryInputStyleClassName}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search..."
        />
        <button
          className={primaryButtonStyleClassName + " ml-2"}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Submit
        </button>
      </form>

      {videos && (
        <div className="VideoSearchContainer flex-grow overflow-y-auto mt-2 w-full">
          {videos.map((vid: YouTubeVideoSearchResult) => (
            <VideoSearchCard video={vid} key={vid.id.videoId} {...props} />
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoSearch;
