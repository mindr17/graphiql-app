import { createAsyncThunk } from '@reduxjs/toolkit';

const config = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

interface EditorFetchArgs {
  url: string;
  body: string;
}

export const editorFetch = createAsyncThunk<
  string,
  EditorFetchArgs,
  { rejectValue: string }
>('editor/fetch', async ({ url, body }, { rejectWithValue }) => {
  try {
    const response = await fetch(url, {
      ...config,
      body: JSON.stringify({ body }),
    });

    const data = await response.json();

    return data;
  } catch (err) {
    if (err instanceof Error) return rejectWithValue(err.message);

    return rejectWithValue('Error!');
  }
});
