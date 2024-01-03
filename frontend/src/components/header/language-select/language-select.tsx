/* eslint-disable @next/next/no-img-element */
import { clsx } from 'clsx';
import { FC, useContext, useRef, useState } from 'react';

import { AppContext, localeType } from '@/context/context';
import useOnClickOutside from '@/helpers/use-click-outside';

import styles from './language-select.module.scss';

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
    <div className={styles.dropdown} ref={menuRef}>
      <button
        className={clsx(styles.selected, styles.smSize)}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <img
          alt='ru'
          className={styles.smSize}
          src={`/icons/${locale}.svg`}
        />
      </button>
      <div
        className={clsx(styles.dropdownMenu, {
          [styles.dropdownMenuActive]: isMenuOpen,
        })}
      >
        <div
          className={styles.langdiv}
          onClick={() => handleLanguageChange(languages.en.code)}
        >
          <div className={clsx(styles.selected, styles.smSize)}>
            <img
              alt={languages.ru.code}
              className={styles.smSize}
              src={'/icons/en.svg'}
            />
          </div>
        </div>
        <div
          className={styles.langdivBottom}
          onClick={() => handleLanguageChange(languages.ru.code)}
        >
          <div className={clsx(styles.selected, styles.smSize)}>
            <img
              alt={languages.en.code}
              className={styles.smSize}
              src={'/icons/ru.svg'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelect;
