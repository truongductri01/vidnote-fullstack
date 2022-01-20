function VideoSearchCar({ video, setSelectedVideo }) {
  return (
    <div
      className="VideoSearchCar"
      style={{
        cursor: "pointer",
        marginBottom: "12px",
        backgroundColor: "lightgreen",
      }}
      onClick={() => setSelectedVideo(video)}
    >
      <h3>{video.snippet.title}</h3>
      <img src={video.snippet.thumbnails.medium.url} alt="" />
    </div>
  );
}

export default VideoSearchCar;
