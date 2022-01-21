import { createSlice } from "@reduxjs/toolkit";

const notesReducer = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    selectedNote: null,
  },
  reducers: {
    setSelectedNote: (state, actions) => {
      if (state.selectedNote) {
        state.selectedNote = { ...state.selectedNote, ...actions.payload };
      } else {
        state.selectedNote = actions.payload;
      }
    },
    setNotes: (state, newNotes) => {
      state.notes = newNotes;
    },
  },
});

export const { setNotes, setSelectedNote } = notesReducer.actions;
export default notesReducer.reducer;
