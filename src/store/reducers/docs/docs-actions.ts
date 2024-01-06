import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  buildClientSchema,
  getIntrospectionQuery,
  GraphQLSchema,
} from 'graphql';

import {
  ExplorerFetchArgs,
  FetchDocsReturns,
} from '@/store/store.types';

const config = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export const explorerFetchDocs = createAsyncThunk<
  FetchDocsReturns,
  ExplorerFetchArgs,
  { rejectValue: string }
>('explorer/fetchDocs', async ({ url }, { rejectWithValue }) => {
  try {
    const request = await fetch(url, {
      ...config,
      body: JSON.stringify({
        query: getIntrospectionQuery(),
      }),
    });

    const response = await request.json();

    if (request.ok) {
      return {
        docs: buildClientSchema(response.data) as GraphQLSchema,
        success: true,
      };
    } else {
      return { docs: null, success: false };
    }
  } catch (err) {
    if (err instanceof Error) return rejectWithValue(err.message);

    return rejectWithValue('Error!');
  }
});
