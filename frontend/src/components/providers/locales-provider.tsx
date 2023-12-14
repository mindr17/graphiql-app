'use client';

interface Props {
  children: JSX.Element;
}

import { createContext } from 'react';

interface Context {
  locale: 'en' | 'ru';
}

const initialAppContext: Context = {
  locale: 'ru',
};

const AppContext = createContext<Context>(initialAppContext);

const LocalesProvider = (props: Props) => {
  const { children } = props;
  const value: Context = {
    locale: 'en',
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default LocalesProvider;
