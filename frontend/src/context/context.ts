import { createContext } from 'react';

export type localeType = 'en' | 'ru';
export interface Context {
  locale: localeType;
  translations: unknown;
  setLocale: (locale: localeType) => void;
}

const initialAppContext: Context = {
  locale: 'en',
  translations: undefined,
  setLocale: () => {},
};

export const AppContext = createContext<Context>(initialAppContext);
