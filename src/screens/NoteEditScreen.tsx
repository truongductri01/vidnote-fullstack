import React, { useState, useEffect } from "react";
import DraftEditor from "../components/DraftEditor/DraftEditor";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { EditorState, ContentState } from "draft-js";
import { setSelectedNote } from "../redux/reducers/notes/notesReducer";
import { setLoader } from "../redux/reducers/loader/loaderReducer";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { stringDelimeter } from "../constants";
import NoteVideo from "../components/NoteVideo/NoteVideo";
import { getNoteById, setNoteBackend } from "../apis/noteApis";

function NoteEditScreen() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { noteId } = useParams();
  const videoId = searchParams.get("videoId");
  const selectedNote = useAppSelector((state) => state.notes.selectedNote);
  const userInfo = useAppSelector((state) => state.user.userInfo);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText("", stringDelimeter)
    )
  );
  const [data, setData] = useState(selectedNote);
  console.log(data);

  useEffect(() => {
    setEditorState(() =>
      EditorState.createWithContent(
        ContentState.createFromText(
          data?.noteData?.note ? data?.noteData?.note : "",
          stringDelimeter
        )
      )
    );
  }, [data]);

  useEffect(() => {
    dispatch(setLoader(true));
    getNoteById(
      selectedNote?.noteData?.id ? selectedNote?.noteData?.id : noteId
    )
      .then((res: any) => {
        dispatch(setLoader(false));
        if (res) {
          setData({ ...data, noteData: { ...data.noteData, ...res } });
        } else {
          setData({
            ...data,
            noteData: {
              ...data.noteData,
              id: res,
            },
          });
        }
      })
      .catch(() => {
        dispatch(setLoader(false));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="NoteEditScreen w-full flex-grow flex flex-col items-start overflow-y-auto lg:flex-row">
      {videoId && <NoteVideo video={data.video} videoId={videoId} />}
      <div className="flex-grow w-full flex flex-col overflow-y-auto lg:h-full">
        <DraftEditor
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <button
          className="min-w-10 w-full h-max p-2 bg-violet-800 text-gray-100 mt-2 rounded-lg"
          onClick={() => {
            dispatch(setLoader(true));
            // setNoteById(
            //   editorState.getCurrentContent().getPlainText(stringDelimeter),
            //   data
            // ).then(() => {
            //   alert("Data is saved");
            //   dispatch(setLoader(false));
            //   dispatch(setSelectedNote(data));
            // });
            setNoteBackend({
              id: selectedNote?.noteData?.id
                ? selectedNote.noteData.id
                : noteId,
              note: editorState
                .getCurrentContent()
                .getPlainText(stringDelimeter),
              status: "public",
              videoId: videoId,
              authorId: userInfo.id,
            })
              .then((isSuccess: boolean) => {
                if (isSuccess) {
                  alert("Data is saved");
                  dispatch(setSelectedNote(data));
                }
                dispatch(setLoader(false));
              })
              .catch(() => {
                dispatch(setLoader(false));
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
