import { useState } from "react";
import { primaryInputStyle } from "../../designComponents/Input/inputStyles";
import {
  defaultSearchResultLength,
  YOUTUBE_API_KEY,
} from "../../helpers/constants";
import { fetchYoutube } from "../../helpers/utils";
import VideoSearchCard from "../VideoSearchCard/VideoSearchCard";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/reducers/loader/loaderReducer";

const VideoSearch = (props) => {
  const [videos, setVideos] = useState();
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setLoading(true));
    fetchYoutube(keyword, defaultSearchResultLength, YOUTUBE_API_KEY)
      .then((data) => {
        dispatch(setLoading(false));
        setVideos(data.items);
      })
      .catch((err) => dispatch(setLoading(false)));
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
        {/* <label htmlFor="">Search</label> */}
        <input
          className={primaryInputStyle}
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search..."
        />
        <button
          className="min-w-[32px] px-2 bg-violet-500 text-gray-100 rounded-md ml-1"
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          Submit
        </button>
      </form>

      {videos && (
        <div className="VideoSearchContainer flex-grow overflow-y-auto mt-2">
          {videos.map((vid) => (
            <VideoSearchCard video={vid} key={vid.id.videoId} {...props} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoSearch;
