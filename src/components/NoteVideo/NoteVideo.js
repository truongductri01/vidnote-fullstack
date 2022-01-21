function NoteVideo({ video }) {
  return (
    <div className="NoteVideo">
      {/* <img src={video.snippet.thumbnails.high.url} alt="" /> */}
      <iframe
        width="100%"
        height="315px"
        src={`https://www.youtube.com/embed/${video.id.videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default NoteVideo;
