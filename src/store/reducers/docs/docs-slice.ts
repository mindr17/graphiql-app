import { createSlice } from '@reduxjs/toolkit';

import { DocsState } from '@/store/store.types';

import { explorerFetchDocs } from './docs-actions';

const initialState: DocsState = {
  docs: null,
  error: undefined,
  isLoading: false,
  isSucces: false,
};

const docsReducer = createSlice({
  name: 'docsReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(explorerFetchDocs.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.error = undefined;
      })
      .addCase(explorerFetchDocs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        (state as DocsState).docs = payload.docs;
        state.isSucces = payload.success;
      })
      .addCase(explorerFetchDocs.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSucces = false;
        state.error = payload;
      });
  },
});

export default docsReducer.reducer;
