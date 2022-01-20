import { useState } from "react";
import {
  defaultSearchResultLength,
  YOUTUBE_API_KEY,
} from "../../helpers/constants";
import { fetchYoutube } from "../../helpers/utils";
import VideoSearchCar from "../VideoSearchCar/VideoSearchCar";

const VideoSearch = (props) => {
  const [videos, setVideos] = useState();
  const [keyword, setKeyword] = useState("");

  const handleSubmit = () => {
    fetchYoutube(keyword, defaultSearchResultLength, YOUTUBE_API_KEY).then(
      (data) => {
        setVideos(data.items);
      }
    );
  };

  videos && console.log(videos);

  return (
    <div className="VideoSearch">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <label htmlFor="">Search</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search..."
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Submit
        </button>
      </form>

      {videos && (
        <div className="VideoSearchContainer">
          {videos.map((vid) => (
            <VideoSearchCar video={vid} key={vid.id.videoId} {...props} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoSearch;
