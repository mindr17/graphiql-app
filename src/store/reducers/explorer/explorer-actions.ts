import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'sonner';

import {
  ExplorerFetchResultArgs,
  ExplorerFetchResultReturns,
} from '../../store.types';

const config = (headers: string | null): RequestInit => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...JSON.parse(headers ? headers : '{}'),
    },
  };
};

export const explorerFetchResult = createAsyncThunk<
  ExplorerFetchResultReturns,
  ExplorerFetchResultArgs,
  { rejectValue: string }
>(
  'explorer/fetchResult',
  async ({ url, query, variables, headers }, { rejectWithValue }) => {
    try {
      const request = await fetch(url, {
        ...config(headers),
        body: JSON.stringify({ query, variables }),
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
      if (err instanceof Error) {
        toast.error('Error: ' + err.message);
        return rejectWithValue(err.message);
      }

      toast.error('Error: Something went wrong!');
      return rejectWithValue('Error: Something went wrong!');
    }
  }
);
