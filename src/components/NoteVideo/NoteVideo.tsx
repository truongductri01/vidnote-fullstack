import { useState } from "react";
import { YouTubeVideoSearchResult } from "../../types/youtubeResponseType";

function NoteVideo({ video }: { video: YouTubeVideoSearchResult }) {
  const [isVideoFormat, setIsVideoFormat] = useState(false);

  return (
    <div className="NoteVideo box-border flex-shrink-0 flex flex-col items-center mb-2 w-full lg:w-[400px] xl:w-[500px] lg:px-3">
      <div className="flex flex-col w-full items-center justify-between sm:flex-row lg:flex-col">
        {!isVideoFormat && (
          <img
            alt=""
            src={(video as any)?.snippet?.thumbnails.medium.url}
            width={(video as any)?.snippet?.thumbnails.medium.width + "px"}
            height={(video as any)?.snippet?.thumbnails.medium.height + "px"}
            className="rounded-md"
          />
        )}
        {isVideoFormat && (
          <iframe
            className="w-full flex-grow h-max sm:h-[180px] lg:h-[240px] xl:h-[300px]"
            src={`https://www.youtube.com/embed/${
              (video as YouTubeVideoSearchResult)?.id?.videoId || video?.id
            }?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        <div className="content h-full w-full sm:ml-2 flex flex-col">
          <p
            className="text-base"
            dangerouslySetInnerHTML={{ __html: (video as any).snippet.title }}
          ></p>
          <div className="flex items-center mt-1">
            <p className="text-sm text-gray-500">
              {(video as any).snippet.channelTitle}
            </p>
            <button
              className="h-max w-max px-2 py-1 ml-2 rounded-md bg-yellow-400 sm:mt-auto text-sm"
              onClick={() => setIsVideoFormat(!isVideoFormat)}
            >
              {isVideoFormat ? "Close Video" : "Watch Video"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteVideo;
