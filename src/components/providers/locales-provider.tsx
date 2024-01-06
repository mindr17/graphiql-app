'use client';

import { useEffect, useState } from 'react';

import {
  AppContext,
  Context,
  initialTranslations,
  localeType,
} from '@/context/context';
import { translationsType } from '@/types/translations';

interface Props {
  children: JSX.Element;
}

const LocalesProvider = (props: Props) => {
  const { children } = props;
  const [locale, setLocale] = useState<localeType>('en');
  const [translations, setTranslations] = useState<translationsType>(
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
