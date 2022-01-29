import { useEffect, useState } from "react";
import { fetchYoutubeVideoByIdBackend } from "../../apis/youtubeApis";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedNote } from "../../redux/reducers/notes/notesReducer";
import { YouTubeVideoSearchResult } from "../../types/youtubeResponseType";

function NoteVideo({
  video,
  videoId,
}: {
  video: YouTubeVideoSearchResult | null | undefined;
  videoId: string;
}) {
  const [hasData, setHasData] = useState(video ? true : false);
  const [videoData, setVideoData] = useState(video ? video : {});
  const [isVideoFormat, setIsVideoFormat] = useState(false);
  const selectedNote = useAppSelector((state) => state.notes.selectedNote);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!video) {
      fetchYoutubeVideoByIdBackend(videoId).then((data) => {
        if (Object.keys(data).length > 0) {
          setHasData(true);
        }
        setVideoData({ ...data });
        dispatch(setSelectedNote({ ...selectedNote, video: data }));
      });
    }
  }, []);

  return (
    <div className="NoteVideo box-border flex-shrink-0 flex flex-col items-center mb-2 w-full lg:w-[300px] lg:px-5">
      <div className="flex flex-col items-center justify-between sm:flex-row lg:flex-col">
        {!hasData && <div>No data</div>}

        {hasData && Object.keys(videoData).length > 0 && !isVideoFormat && (
          <img
            alt=""
            src={(videoData as any)?.snippet?.thumbnails.medium.url}
            width={(videoData as any)?.snippet?.thumbnails.medium.width + "px"}
            height={
              (videoData as any)?.snippet?.thumbnails.medium.height + "px"
            }
          />
        )}
        {hasData && Object.keys(videoData).length > 0 && isVideoFormat && (
          <iframe
            className="w-full flex-grow h-max sm:h-[180px]"
            src={`https://www.youtube.com/embed/${
              (videoData as YouTubeVideoSearchResult)?.id?.videoId
            }`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
        {hasData && Object.keys(videoData).length > 0 && (
          <div className="content h-full w-full sm:ml-2 flex flex-col">
            <p className="text-base">{(videoData as any).snippet.title}</p>
            <p className="text-sm text-gray-500">
              {(videoData as any).snippet.channelTitle}
            </p>
            <button
              className="h-max w-max p-1 px-2 rounded-md bg-yellow-400 mt-2 sm:mt-auto"
              onClick={() => setIsVideoFormat(!isVideoFormat)}
            >
              {isVideoFormat ? "Close Video" : "Watch Video"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteVideo;
