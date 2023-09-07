import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setSelectedNote } from "../../redux/reducers/notes/notesReducer";
import { NoteData } from "../../types/noteFetchingDataType";

function NoteCard({ noteData }: { noteData: NoteData }) {
    const navigate = useNavigate();
    const userInfo = useAppSelector((state) => state.user.userInfo);
    const selectedNote = useAppSelector((state) => state.notes.selectedNote);
    const dispatch = useAppDispatch();
    return (
        <div
            className="NoteCard w-full cursor-pointer box-border last:mb-0 mb-5 pb-5 border-b-2 border-b-primary"
            key={noteData.id}
            onClick={() => {
                if (
                    selectedNote.noteData.videoId &&
                    noteData.videoId !== selectedNote.noteData.videoId
                ) {
                    dispatch(
                        setSelectedNote({
                            noteData: { ...noteData },
                            video: null,
                        })
                    );
                } else {
                    dispatch(
                        setSelectedNote({
                            ...selectedNote,
                            noteData: { ...noteData },
                        })
                    );
                }
                navigate(
                    `/notes/${userInfo.id + noteData.videoId}?videoId=${
                        noteData.videoId
                    }`
                );
            }}
        >
            <img
                className="rounded-md flex-shrink-0 w-full h-auto mb-3"
                src={noteData.video.url as any}
                alt=""
            />
            <div>
                <p
                    className="flex-grow font-bold text-ellipsis overflow-hidden whitespace-nowrap sm:ml-2 sm:whitespace-normal"
                    dangerouslySetInnerHTML={{
                        __html: noteData.video.title as string,
                    }}
                ></p>
                <p
                    className="flex-grow text-sm text-ellipsis overflow-hidden whitespace-nowrap sm:ml-2 sm:whitespace-normal"
                    dangerouslySetInnerHTML={{
                        __html: noteData.video.channelTitle as string,
                    }}
                ></p>
            </div>
        </div>
    );
}

export default NoteCard;
