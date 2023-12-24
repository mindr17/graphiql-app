import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface EditorState {
  url: string;
}

const initialState: EditorState = {
  url: '',
};

const editorReducer = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setUrl: (state: EditorState, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
});

export const { setUrl } = editorReducer.actions;

export default editorReducer.reducer;
