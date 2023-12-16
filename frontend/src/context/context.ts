import { createContext } from 'react';

import { translationsType } from '@/types/translations';

export type localeType = 'en' | 'ru';
export interface Context {
  locale: localeType;
  translations: translationsType;
  setLocale: (locale: localeType) => void;
}

export const initialTranslations: translationsType = {
  signIn: 'Sign In',
  signUp: 'Sign Up',
  signOut: 'Sign Out',
  h1: 'Welcome',
  errorBoundaryTitle: 'Error... Something went wrong!',
  errorBoundaryBtn: 'Reload Page',
};

const initialAppContext: Context = {
  locale: 'en',
  translations: initialTranslations,
  setLocale: () => {},
};

export const AppContext = createContext<Context>(initialAppContext);
