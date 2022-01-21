import DraftEditor from "../components/DraftEditor/DraftEditor";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditorState, ContentState } from "draft-js";
import { stringDelimeter } from "../helpers/constants";
import { getNoteByVidId, setNoteByVidId } from "../firebase/firestore";
import { setSelectedNote } from "../redux/reducers/notes/notesReducer";
import NoteVideo from "../components/NoteVideo/NoteVideo";

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
    getNoteByVidId(selectedNote?.id ? selectedNote.id : noteId).then((res) => {
      if (res) {
        setData({ ...data, ...res });
      }
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
        onClick={() => {
          // console.log(
          //   editorState.getCurrentContent().getPlainText(stringDelimeter)
          // );
          setNoteByVidId(
            editorState.getCurrentContent().getPlainText(stringDelimeter),
            data
          ).then(() => {
            alert("Data is saved");
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
