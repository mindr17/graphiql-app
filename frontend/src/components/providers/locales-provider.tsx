'use client';

import { useEffect, useState } from 'react';

import { AppContext, Context, localeType } from '@/context/context';

interface Props {
  children: JSX.Element;
  translations: unknown;
}

const LocalesProvider = (props: Props) => {
  const { children } = props;
  const initialTranslations = undefined;
  const [locale, setLocale] = useState<localeType>('en');
  const [translations, setTranslations] = useState(
    initialTranslations
  );
  const value: Context = {
    locale,
    translations,
    setLocale,
  };

  useEffect(() => {
    fetch(`/locales/${locale}/global.json`)
      .then((result) => result.json())
      .then((json) => {
        setTranslations(json);
      });
  }, [locale]);

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default LocalesProvider;
