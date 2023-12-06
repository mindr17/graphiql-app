import { GraphQLClient } from "graphql-request";
import { config } from '../config';

export const readerClient = new GraphQLClient(`${config.fetchUrl}/graphql`, {
  headers: {
    Authorization: config.readerToken ? `Bearer ${config.readerToken}` : "",
  }
});

export const writerClient = new GraphQLClient(`${config.fetchUrl}/graphql`, {
  headers: {
    Authorization: config.writerToken ? `Bearer ${config.writerToken}` : "",
  }
});
