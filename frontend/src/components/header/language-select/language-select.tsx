/* eslint-disable @next/next/no-img-element */
import { clsx } from 'clsx';
import { FC, useContext, useRef, useState } from 'react';

import { AppContext, localeType } from '@/context/context';
import useOnClickOutside from '@/helpers/use-click-outside';

import s from './language-select.module.scss';

interface Languages {
  en: {
    code: localeType;
  };
  ru: {
    code: localeType;
  };
}

const LanguageSelect: FC = () => {
  const context = useContext(AppContext);
  const { locale, setLocale } = context;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const languages: Languages = {
    ru: {
      code: 'ru',
    },
    en: {
      code: 'en',
    },
  };

  const handleLanguageChange = (newLocale: localeType) => {
    setLocale(newLocale);
    setIsMenuOpen(false);
  };

  useOnClickOutside(menuRef, () => setIsMenuOpen(false));

  return (
    <div className={s.dropdown} ref={menuRef}>
      <button
        className={clsx(s.selected, s.smSize)}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <img
          alt='ru'
          className={s.smSize}
          src={`/icons/${locale}.svg`}
        />
      </button>
      <div
        className={clsx(s.dropdownMenu, {
          [s.dropdownMenuActive]: isMenuOpen,
        })}
      >
        <div
          className={s.langdiv}
          onClick={() => handleLanguageChange(languages.en.code)}
        >
          <div className={clsx(s.selected, s.smSize)}>
            <img
              alt={languages.ru.code}
              className={s.smSize}
              src={'/icons/en.svg'}
            />
          </div>
        </div>
        <div
          className={s.langdivBottom}
          onClick={() => handleLanguageChange(languages.ru.code)}
        >
          <div className={clsx(s.selected, s.smSize)}>
            <img
              alt={languages.en.code}
              className={s.smSize}
              src={'/icons/ru.svg'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelect;
