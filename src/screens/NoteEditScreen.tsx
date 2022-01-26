import React, { useState, useEffect } from "react";
import DraftEditor from "../components/DraftEditor/DraftEditor";
import { useNavigate, useParams } from "react-router-dom";
import { EditorState, ContentState } from "draft-js";
import { setSelectedNote } from "../redux/reducers/notes/notesReducer";
import { getNoteByVidId, setNoteByVidId } from "../firebase/firestore";
import { setLoader } from "../redux/reducers/loader/loaderReducer";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { stringDelimeter } from "../constants";
import NoteVideo from "../components/NoteVideo/NoteVideo";

function NoteEditScreen() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { noteId } = useParams();
  const selectedNote = useAppSelector((state) => state.notes.selectedNote);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(
      ContentState.createFromText("", stringDelimeter)
    )
  );
  const [data, setData] = useState(selectedNote);

  useEffect(() => {
    setEditorState(() =>
      EditorState.createWithContent(
        ContentState.createFromText(
          data?.note ? data?.note : "",
          stringDelimeter
        )
      )
    );
  }, [data]);

  useEffect(() => {
    dispatch(setLoader(true));
    getNoteByVidId(selectedNote?.id ? selectedNote.id : noteId)
      .then((res: any) => {
        dispatch(setLoader(false));
        if (res) {
          setData({ ...data, ...res });
        }
      })
      .catch(() => {
        dispatch(setLoader(true));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data || !data.video || !data.id) {
    return <button onClick={() => navigate("/notes")}>Go back to Notes</button>;
  }

  return (
    <div className="NoteEditScreen w-full flex-grow flex flex-col items-start overflow-y-auto lg:flex-row">
      <NoteVideo video={data.video} />
      <div className="flex-grow w-full flex flex-col overflow-y-auto lg:h-full">
        <DraftEditor
          editorState={editorState}
          setEditorState={setEditorState}
        />
        <button
          className="min-w-10 w-full h-max p-2 bg-violet-800 text-gray-100 mt-2 rounded-lg"
          onClick={() => {
            dispatch(setLoader(true));
            setNoteByVidId(
              editorState.getCurrentContent().getPlainText(stringDelimeter),
              data
            ).then(() => {
              alert("Data is saved");
              dispatch(setLoader(false));
              dispatch(setSelectedNote(data));
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
