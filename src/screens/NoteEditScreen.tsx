import React, { useState, useEffect } from "react";
import DraftEditor from "../components/DraftEditor/DraftEditor";
import { useParams, useSearchParams } from "react-router-dom";
import { EditorState, ContentState } from "draft-js";
import {
  setNotes,
  setSelectedNote,
} from "../redux/reducers/notes/notesReducer";
import { setLoader } from "../redux/reducers/loader/loaderReducer";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { stringDelimeter } from "../constants";
import NoteVideo from "../components/NoteVideo/NoteVideo";
import { getNoteById, setNoteBackend } from "../apis/noteApis";
import { NoteData } from "../types/noteFetchingDataType";
import { fetchYoutubeVideoByIdBackend } from "../apis/youtubeApis";
import { setUserInfo } from "../redux/reducers/user/userReducer";
import { setToast } from "../redux/reducers/toast/toastReducer";

function NoteEditScreen() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { noteId } = useParams();
  const videoId = searchParams.get("videoId");
  const selectedNote = useAppSelector((state) => state.notes.selectedNote);
  const notes = useAppSelector((state) => state.notes.notes);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText(selectedNote.noteData.note, stringDelimeter)
    )
  );
  const [data, setData] = useState(selectedNote);

  useEffect(() => {
    setData(selectedNote);
  }, [selectedNote]);

  useEffect(() => {
    if (!selectedNote.noteData.id) {
      dispatch(setLoader(true));
      getNoteById(
        selectedNote?.noteData?.id ? selectedNote?.noteData?.id : noteId
      )
        .then((res: any) => {
          dispatch(setLoader(false));
          if (res) {
            if (res.note) {
              setEditorState(() =>
                EditorState.createWithContent(
                  ContentState.createFromText(res.note, stringDelimeter)
                )
              );
            }
            dispatch(
              setSelectedNote({
                ...selectedNote,
                noteData: { ...res },
              })
            );
            setData({ ...data, noteData: { ...data.noteData, ...res } });
          }
        })
        .catch((e) => {
          dispatch(setLoader(false));
          alert("Error in note edit screen " + e);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      selectedNote.noteData.id &&
      selectedNote.noteData.videoId &&
      !selectedNote.video
    ) {
      if (!selectedNote.video || (selectedNote.video as any)?.id !== videoId) {
        dispatch(setLoader(true));
        fetchYoutubeVideoByIdBackend(selectedNote.noteData.videoId)
          .then((videoData) => {
            dispatch(
              setSelectedNote({
                noteData: { ...selectedNote.noteData },
                video: { ...videoData },
              })
            );
            dispatch(setLoader(false));
          })
          .catch((e) => {
            dispatch(setLoader(false));
            alert("Error while fetching youtube video" + e);
          });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote.noteData.id]);

  return (
    <div className="NoteEditScreen w-full flex-grow flex flex-col items-start overflow-y-auto lg:flex-row">
      {selectedNote.video && <NoteVideo video={selectedNote.video} />}
      <div className="flex-grow w-full flex flex-col overflow-y-auto lg:h-full">
        <DraftEditor
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <button
          className="min-w-10 w-full h-max p-2 bg-violet-800 text-gray-100 mt-2 rounded-lg"
          onClick={() => {
            dispatch(setLoader(true));
            const newData = {
              id: selectedNote?.noteData?.id
                ? selectedNote.noteData.id
                : noteId,
              note: editorState
                .getCurrentContent()
                .getPlainText(stringDelimeter),
              status: "public",
              videoId: videoId,
              authorId: userInfo.id,
              video: {
                url: selectedNote.video?.snippet?.thumbnails.medium.url,
                title: selectedNote.video?.snippet.title,
                channelTitle: selectedNote.video?.snippet.channelTitle,
              },
            };
            setNoteBackend(newData)
              .then((isSuccess: boolean) => {
                if (isSuccess) {
                  dispatch(setSelectedNote({ ...data }));
                  let hasNote = false;
                  for (let note of notes) {
                    if (note.id === newData.id) {
                      hasNote = true;
                      break;
                    }
                  }
                  if (!hasNote) {
                    dispatch(setNotes([...notes, { ...newData }]));
                  } else {
                    dispatch(
                      setNotes(
                        notes.map((note: NoteData) => {
                          if (note.id === newData.id) {
                            return { ...newData };
                          } else {
                            return { ...note };
                          }
                        })
                      )
                    );
                  }

                  // update user notes id list => prevent unneccesary fetching on notes screen
                  let hasIdInUserInfo = userInfo.notesId.includes(
                    newData.id as any
                  );
                  if (!hasIdInUserInfo) {
                    dispatch(
                      setUserInfo({
                        ...userInfo,
                        notesId: [...userInfo.notesId, newData.id],
                      })
                    );
                  }
                }
                dispatch(setLoader(false));
                dispatch(
                  setToast({
                    hasToast: true,
                    type: "success",
                    message: "Note is saved",
                  })
                );
              })
              .catch((e) => {
                dispatch(setLoader(false));
                dispatch(
                  setToast({
                    hasToast: true,
                    type: "error",
                    message: "" + e,
                  })
                );
              });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default NoteEditScreen;
