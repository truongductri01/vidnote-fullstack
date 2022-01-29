import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setSelectedNote: (state, actions) => {
      if (state.selectedNote) {
        state.selectedNote = { ...state.selectedNote, ...actions.payload };
      } else {
        state.selectedNote = actions.payload;
      }
    },
    setNotes: (state, actions: PayloadAction<any[]>) => {
      state.notes = actions.payload;
    },
  },
});

export const { setNotes, setSelectedNote } = notesSlice.actions;
export default notesSlice.reducer;
