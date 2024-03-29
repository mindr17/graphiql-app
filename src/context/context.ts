import { createContext } from 'react';

import type { translationsType } from '@/types/translations';

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
  mainTitle: 'Welcome to GraphiQL Explorer!',
  mainSubTitle: 'GraphiQL is a playground/IDE for graphQL requests.',
  mainBtn: 'Get started',
  mainAboutTitle: 'About project',
  mainTeamTitle: 'Team developers',
  mainTeamLinkText: 'Visit on GitHub',
  mainCourseText:
    'The project is being developed as part of the final task of the course React (2023Q4) from the RS School.',
  errorBoundaryTitle: 'Error... Something went wrong!',
  errorBoundaryBtn: 'Reload Page',
  notFoundTitile: 'Not Found Page',
  notFoundBtn: 'Back To Home',
  explorerInput: 'Enter the URL',
  explorerSend: 'Send',
  explorerResult: 'Result',
  explorerDocs: 'Docs',
  explorerHeaders: 'Headers',
  explorerVariables: 'Variables',
  explorerHeadersPlaceholder: 'Field for entering request headers',
  explorerVariablesPlaceholder:
    'Field for entering request variables',
  explorerPrettifyingSuccess: 'Query was been prettified successfuly',
  explorerVariablesError: 'Variables is invalid. Try anothers!',
  explorerHeadersError: 'Headers is invalid. Try anothers!',
};

const initialAppContext: Context = {
  locale: 'en',
  translations: initialTranslations,
  setLocale: () => {},
};

export const AppContext = createContext<Context>(initialAppContext);
