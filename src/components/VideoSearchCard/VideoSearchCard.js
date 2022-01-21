import { useDispatch } from "react-redux";
import { setSelectedNote } from "../../redux/reducers/notes/notesReducer";
import { useNavigate } from "react-router-dom";

function VideoSearchCard({ video }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div
      className="VideoSearchCar"
      style={{
        cursor: "pointer",
        marginBottom: "12px",
        backgroundColor: "lightgreen",
      }}
      onClick={() => {
        dispatch(setSelectedNote({ id: video.id.videoId, video: video }));
        navigate(`/notes/${video.id.videoId}`);
      }}
    >
      <h3>{video.snippet.title}</h3>
      <img src={video.snippet.thumbnails.medium.url} alt="" />
    </div>
  );
}

export default VideoSearchCard;
