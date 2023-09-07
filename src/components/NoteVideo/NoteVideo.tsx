import { useState } from "react";
import { YouTubeVideoSearchResult } from "../../types/youtubeResponseType";

function NoteVideo({ video }: { video: YouTubeVideoSearchResult }) {
    const [isVideoFormat, setIsVideoFormat] = useState(false);

    return (
        <div className="NoteVideo box-border flex-shrink-0 flex flex-col items-center mb-2 w-full lg:w-[400px] xl:w-[500px] lg:px-3">
            <div className="flex flex-col w-full items-center justify-between sm:flex-row lg:flex-col">
                <iframe
                    className="w-full flex-grow h-max sm:h-[180px] lg:h-[240px] xl:h-[300px]"
                    src={`https://www.youtube.com/embed/${
                        (video as YouTubeVideoSearchResult)?.id?.videoId ||
                        video?.id
                    }?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
                <div className="content h-full w-full sm:ml-2 flex flex-col">
                    <p
                        className="text-base text-ellipsis whitespace-nowrap overflow-hidden"
                        dangerouslySetInnerHTML={{
                            __html: (video as any).snippet.title,
                        }}
                    ></p>
                    <div className="flex items-center mt-1">
                        <p className="text-sm text-gray-500">
                            {(video as any).snippet.channelTitle}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NoteVideo;
