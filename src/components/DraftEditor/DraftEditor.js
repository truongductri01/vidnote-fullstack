import React, { useEffect, useState } from "react";
import { Editor, EditorState, ContentState } from "draft-js";
import { getNoteByVidId, setNoteByVidId } from "../../firebase/firestore";
// import "draft-js/dist/Draft.css";

export default function DraftEditor(props) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(ContentState.createFromText("", ",|,"))
  );
  const [data, setData] = useState({
    note: "",
    videoId: "",
  });

  useEffect(() => {
    setEditorState(() =>
      EditorState.createWithContent(
        ContentState.createFromText(data.note, ",|,")
      )
    );
  }, [data]);

  useEffect(() => {
    if (props.selectedVideo?.id?.videoId) {
      getNoteByVidId(props.selectedVideo.id.videoId).then((data) => {
        if (data) {
          console.log(data);
          setData({ ...data });
        }
      });
    }
  }, [props.selectedVideo]);

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  return (
    <div
      style={{ border: "1px solid black", flexGrow: "1", cursor: "text" }}
      onClick={focusEditor}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Enter your note ..."
        // readOnly
      />
      <button
        onClick={() => {
          setNoteByVidId(
            editorState.getCurrentContent().getPlainText(",|,"),
            props.selectedVideo
          );
        }}
      >
        Save
      </button>
    </div>
  );
}
