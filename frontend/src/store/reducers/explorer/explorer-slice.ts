import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ExplorerState } from '../../store.types';
import { explorerFetchResult } from './explorer-actions';

const initialState: ExplorerState = {
  url: '',
  query: '',
  result: '',
  error: undefined,
  isLoading: false,
  isSucces: false,
};

const explorerReducer = createSlice({
  name: 'explorerReducer',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setVariables: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setHeaders: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(explorerFetchResult.pending, (state) => {
        state.isLoading = true;
        state.isSucces = false;
        state.error = undefined;
      })
      .addCase(
        explorerFetchResult.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.result = payload.result;
          state.isSucces = payload.success;
        }
      )
      .addCase(explorerFetchResult.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isSucces = false;
        state.error = payload;
      });
  },
});

export const { setUrl, setQuery } = explorerReducer.actions;

export default explorerReducer.reducer;
