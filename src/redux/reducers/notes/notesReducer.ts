import { createSlice } from "@reduxjs/toolkit";
import { NoteData } from "../../../types/noteFetchingDataType";
import { YouTubeVideoSearchResult } from "../../../types/youtubeResponseType";

type NotesState = {
  notes: any[];
  selectedNote: {
    noteData: NoteData;
    video: YouTubeVideoSearchResult | null;
  };
};
let initialState: NotesState = {
  notes: [],
  selectedNote: {
    noteData: {
      id: "",
      authorId: "",
      note: "",
      videoId: "",
      status: "",
      video: {
        url: "",
        channelTitle: "",
        title: "",
      },
    },
    video: null,
  },
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    resetSelectedNote: (state) => {
      state.selectedNote = { ...initialState.selectedNote };
    },
    resetNotes: (state) => {
      state.notes = [];
      state.selectedNote = { ...initialState.selectedNote };
    },
    removeNoteById: (state, actions: { payload: string; type: string }) => {
      let newNotes: any[] = [];
      state.notes.forEach((note) => {
        note.id !== actions.payload && newNotes.push(note);
      });
      state.notes = [...newNotes];
      state.selectedNote = { ...initialState.selectedNote };
    },
    setSelectedNote: (state, actions) => {
      if (state.selectedNote) {
        state.selectedNote = { ...state.selectedNote, ...actions.payload };
      } else {
        state.selectedNote = actions.payload;
      }
    },
    setNotes: (state, actions) => {
      state.notes = actions.payload;
    },
    setSelectedNoteVideo: (state, actions) => {
      state.selectedNote.video = actions.payload;
    },
  },
});

export const {
  resetNotes,
  resetSelectedNote,
  removeNoteById,
  setNotes,
  setSelectedNote,
  setSelectedNoteVideo,
} = notesSlice.actions;
export default notesSlice.reducer;
