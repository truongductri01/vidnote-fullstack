import React, { useState, useEffect } from "react";
import DraftEditor from "../components/DraftEditor/DraftEditor";
import { useParams, useSearchParams } from "react-router-dom";
import { EditorState, ContentState } from "draft-js";
import { setLoader } from "../redux/reducers/loader/loaderReducer";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { stringDelimeter } from "../constants";
import NoteVideo from "../components/NoteVideo/NoteVideo";
import { getPublicNoteById } from "../apis/noteApis";
import { fetchYoutubeVideoByIdBackend } from "../apis/youtubeApis";
import { setToastError } from "../redux/reducers/toast/toastReducer";
import NavBar from "../components/NavBar/NavBar";
function ViewNoteScreen() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { noteId } = useParams();
  const videoId = searchParams.get("videoId");
  const selectedNote = useAppSelector((state) => state.notes.selectedNote);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText(selectedNote.noteData.note, stringDelimeter)
    )
  );
  const [hasData, setHasData] = useState(false);
  const [video, setVideo] = useState();
  const [appHeight, setAppHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setAppHeight(window.innerHeight);
    });
    window.addEventListener("orientationchange", () => {
      setAppHeight(window.innerHeight);
    });
  }, []);

  useEffect(() => {
    dispatch(setLoader(true));
    if (noteId) {
      getPublicNoteById(noteId)
        .then((noteData) => {
          if (noteData) {
            setHasData(true);
            setEditorState(() =>
              EditorState.createWithContent(
                ContentState.createFromText(noteData.note, stringDelimeter)
              )
            );
          }
          dispatch(setLoader(false));
        })
        .catch((e) => {
          dispatch(setToastError("" + e));
          dispatch(setLoader(false));
        });
    } else {
      dispatch(setLoader(false));
    }
  }, [noteId]);

  useEffect(() => {
    if (!selectedNote.video || (selectedNote.video as any)?.id !== videoId) {
      dispatch(setLoader(true));
      fetchYoutubeVideoByIdBackend(videoId as string)
        .then((videoData) => {
          setVideo({ ...videoData });
          dispatch(setLoader(false));
        })
        .catch((e) => {
          dispatch(setLoader(false));
          dispatch(setToastError("Error while fetching youtube video" + e));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  return (
    <div
      className="NoteEditScreen w-screen max-w-full flex flex-col"
      style={{ height: appHeight + "px" }}
    >
      <NavBar />
      <div className="p-2 w-full flex-grow flex flex-col items-start overflow-y-auto lg:flex-row">
        {hasData && (
          <>
            {video && <NoteVideo video={video} />}
            <div className="flex-grow w-full flex flex-col overflow-y-auto lg:h-full">
              <DraftEditor
                editorState={editorState}
                setEditorState={setEditorState}
                readOnly
              />
            </div>
          </>
        )}
        {!hasData && (
          <div className="w-full h-full flex justify-center">
            <p className="text-2xl text-red-600 h-max mt-20">
              The Note you are looking for is either private or not exist
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewNoteScreen;
