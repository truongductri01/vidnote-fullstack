import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    resetSelectedNote,
    setSelectedNoteVideo,
} from "../../redux/reducers/notes/notesReducer";
import { useNavigate } from "react-router-dom";
import { YouTubeVideoSearchResult } from "../../types/youtubeResponseType";

type VideoSearchCardProps = {
    video: YouTubeVideoSearchResult;
};

function VideoSearchCard({ video }: VideoSearchCardProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const selectedNote = useAppSelector((state) => state.notes.selectedNote);
    return (
        <div
            className="VideoSearchCar w-full cursor-pointer mb-5 pb-5 flex flex-col border-b-2 border-b-primary"
            onClick={() => {
                if (
                    userInfo.id + video.id.videoId !==
                    selectedNote.noteData.id
                ) {
                    dispatch(resetSelectedNote());
                }
                dispatch(
                    setSelectedNoteVideo({
                        ...video,
                    })
                );
                navigate(
                    `/notes/${userInfo.id + video.id.videoId}?videoId=${
                        video.id.videoId
                    }`
                );
            }}
        >
            <img
                src={video.snippet.thumbnails.medium.url}
                alt=""
                className="rounded-md w-full"
            />
            <div className=" mt-3">
                <p
                    className="font-bold"
                    dangerouslySetInnerHTML={{ __html: video.snippet.title }}
                ></p>
                <p
                    className=" text-sm"
                    dangerouslySetInnerHTML={{
                        __html: video.snippet.channelTitle,
                    }}
                ></p>
            </div>
        </div>
    );
}

export default VideoSearchCard;
