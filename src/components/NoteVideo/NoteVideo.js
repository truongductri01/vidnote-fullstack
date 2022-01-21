import { useState } from "react";

function NoteVideo({ video }) {
  const [isVideoFormat, setIsVideoFormat] = useState(false);
  return (
    <div className="NoteVideo flex flex-col items-center">
      <button
        className="h-max w-max p-1 px-2 rounded-md mb-2 bg-yellow-400"
        onClick={() => setIsVideoFormat(!isVideoFormat)}
      >
        {isVideoFormat ? "Close Video" : "Watch video"}
      </button>
      {!isVideoFormat && (
        <div className="flex items-center justify-between">
          <img
            src={video.snippet.thumbnails.default.url}
            alt=""
            width={video.snippet.thumbnails.default.width + "px"}
            height={video.snippet.thumbnails.default.height + "px"}
          />
          <div className="content h-full">
            <p className="text-sm">{video.snippet.title}</p>
            <p className="text-xs text-gray-500">
              {video.snippet.channelTitle}
            </p>
          </div>
        </div>
      )}
      {isVideoFormat && (
        <iframe
          className="w-full h-[315px]"
          src={`https://www.youtube.com/embed/${video.id.videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default NoteVideo;
