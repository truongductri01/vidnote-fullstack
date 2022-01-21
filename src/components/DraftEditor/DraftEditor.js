import React from "react";
import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";
import "./DraftEditor.css";

export default function DraftEditor(props) {
  return (
    <Editor
      editorState={props.editorState}
      onChange={props.setEditorState}
      placeholder="Enter your note ..."
      // readOnly
    />
  );
}
