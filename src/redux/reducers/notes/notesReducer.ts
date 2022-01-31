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
    resetSelectedNote: (state) => {
      state.selectedNote = {
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
      };
    },
    setSelectedNoteVideo: (state, actions) => {
      state.selectedNote.video = actions.payload;
    },
    resetNotes: (state) => {
      state.notes = [];
      state.selectedNote = {
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
      };
    },
  },
});

export const {
  setNotes,
  setSelectedNote,
  resetNotes,
  resetSelectedNote,
  setSelectedNoteVideo,
} = notesSlice.actions;
export default notesSlice.reducer;
