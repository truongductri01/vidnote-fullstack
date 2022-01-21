import DraftEditor from "../components/DraftEditor/DraftEditor";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditorState, ContentState } from "draft-js";
import { stringDelimeter } from "../helpers/constants";
import { getNoteByVidId, setNoteByVidId } from "../firebase/firestore";
import { setSelectedNote } from "../redux/reducers/notes/notesReducer";
import NoteVideo from "../components/NoteVideo/NoteVideo";
import { setLoading } from "../redux/reducers/loader/loaderReducer";

function NoteEditScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noteId } = useParams();
  const selectedNote = useSelector((state) => state.notesReducer.selectedNote);
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
    dispatch(setLoading(true));
    getNoteByVidId(selectedNote?.id ? selectedNote.id : noteId)
      .then((res) => {
        if (res) {
          dispatch(setLoading(false));
          setData({ ...data, ...res });
        }
      })
      .catch(() => {
        dispatch(setLoading(true));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data || !data.video || !data.id) {
    return <button onClick={() => navigate("/notes")}>Go back to Notes</button>;
  }

  return (
    <div
      className="NoteEditScreen"
      style={{
        width: "100%",
        flexGrow: "1",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        overflowY: "auto",
      }}
    >
      <NoteVideo video={data.video} />
      <DraftEditor editorState={editorState} setEditorState={setEditorState} />
      <button
        className="min-w-10 h-max p-2 bg-violet-800 text-gray-100 mt-2 rounded-lg"
        onClick={() => {
          dispatch(setLoading(true));
          setNoteByVidId(
            editorState.getCurrentContent().getPlainText(stringDelimeter),
            data
          ).then(() => {
            alert("Data is saved");
            dispatch(setLoading(false));
            dispatch(setSelectedNote(data));
          });
        }}
      >
        Save
      </button>
    </div>
  );
}

export default NoteEditScreen;
