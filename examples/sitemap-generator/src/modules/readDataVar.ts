import { readerClient } from './clientGq';
import { gql } from 'graphql-request';
import { CountriesQueryDocument, CountriesQueryQuery } from '../gql/graphql';

export const readData = async (locale: string | undefined): Promise<CountriesQueryQuery> => {
  if (!locale) throw new Error('locale is undefined!');

  const variables = {
    locale: 'ru-RU',
  };

  const resp = await readerClient.request(CountriesQueryDocument, variables).catch((e: any) => console.error(e)),

  if (!resp) throw new Error('bad data from api');

  const data: CountriesQueryQuery = resp;

  return data;
};
