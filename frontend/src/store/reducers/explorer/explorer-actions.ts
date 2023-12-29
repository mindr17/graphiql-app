import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  ExplorerFetchResultArgs,
  ExplorerFetchResultReturns,
} from '../../store.types';

const config = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const explorerFetchResult = createAsyncThunk<
  ExplorerFetchResultReturns,
  ExplorerFetchResultArgs,
  { rejectValue: string }
>(
  'explorer/fetchResult',
  async ({ url, query }, { rejectWithValue }) => {
    try {
      const request = await fetch(url, {
        ...config,
        body: JSON.stringify({ query }),
      });

      const response = await request.json();

      if (request.ok) {
        return {
          result: JSON.stringify(response, null, 2),
          success: true,
        };
      } else {
        return { result: response.errors[0].message, success: false };
      }
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);

      return rejectWithValue('Error!');
    }
  }
);