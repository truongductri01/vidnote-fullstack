import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NotesState = {
  notes: any[];
  selectedNote: any;
};
let initialState: NotesState = {
  notes: [],
  selectedNote: {},
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
