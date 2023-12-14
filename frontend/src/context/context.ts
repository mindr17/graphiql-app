import { createContext } from 'react';

export type localeType = 'en' | 'ru';
export interface Context {
  locale: localeType;
  translations: unknown;
  setLocale: (locale: localeType) => void;
}

export const initialTranslations = {
  signIn: 'Sign In',
  signUp: 'Sign Up',
  signOut: 'Sign Out',
};

const initialAppContext: Context = {
  locale: 'en',
  translations: initialTranslations,
  setLocale: () => {},
};

export const AppContext = createContext<Context>(initialAppContext);
