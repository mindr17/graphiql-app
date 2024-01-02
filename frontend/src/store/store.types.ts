import { GraphQLSchema } from 'graphql';

export interface ExplorerState {
  url: string;
  query: string;
  isPrettifyQuery: boolean;
  result: string;
  error: string | undefined;
  isLoading: boolean;
  isSucces: boolean;
}

export interface DocsState {
  docs: GraphQLSchema | null;
  error: string | undefined;
  isLoading: boolean;
  isSucces: boolean;
}

export interface ExplorerFetchArgs {
  url: string;
}

export interface ExplorerFetchResultArgs extends ExplorerFetchArgs {
  query: string;
}

export interface ExplorerFetchResultReturns {
  result: string;
  success: boolean;
}

export interface FetchDocsReturns {
  docs: GraphQLSchema | null;
  success: boolean;
}
