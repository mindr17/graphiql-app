import { GraphQLClient } from 'graphql-request';

import { config } from '@/config';

export const localesMap = new Map<string, string>([
  ['ru', 'ru-RU'],
  ['en', 'en-US'],
]);

export const privateClient = new GraphQLClient(
  `${config.fetchUrl}/graphql`,
  {
    headers: {
      Authorization: config.API_TOKEN_PRIVATE
        ? `Bearer ${config.API_TOKEN_PRIVATE}`
        : '',
    },
  }
);

export const publicClient = new GraphQLClient(
  `${config.publicFetchUrl}/graphql`,
  {
    headers: {
      Authorization: config.API_TOKEN_PUBLIC
        ? `Bearer ${config.API_TOKEN_PUBLIC}`
        : '',
    },
  }
);
