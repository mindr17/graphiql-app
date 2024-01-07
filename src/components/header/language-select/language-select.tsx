import { clsx } from 'clsx';
import Image from 'next/image';
import { FC, useContext, useRef, useState } from 'react';

import { AppContext, localeType } from '@/context/context';
import useOnClickOutside from '@/helpers/use-click-outside';

import styles from './language-select.module.scss';

const LanguageSelect: FC = () => {
  const context = useContext(AppContext);
  const { locale, setLocale } = context;
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const languages: localeType[] = ['en', 'ru'];

  const handleLanguageChange = (newLocale: localeType) => {
    setLocale(newLocale);
    setIsMenuOpen(false);
  };

  useOnClickOutside(menuRef, () => setIsMenuOpen(false));

  return (
    <div
      className={styles.dropdown}
      ref={menuRef}
      data-testid='header-language'
    >
      <button
        className={clsx(styles.selected, styles.smSize)}
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        <Image
          alt={locale}
          width={22}
          height={22}
          className={styles.smSize}
          src={`/icons/${locale}.svg`}
        />
      </button>
      <div
        className={clsx(styles.dropdownMenu, {
          [styles.dropdownMenuActive]: isMenuOpen,
        })}
      >
        {languages.map((language) => {
          return (
            <div
              key={language}
              className={styles.langdiv}
              onClick={() => handleLanguageChange(language)}
            >
              <div className={clsx(styles.selected, styles.smSize)}>
                <Image
                  alt={language}
                  width={22}
                  height={22}
                  className={styles.smSize}
                  src={`/icons/${language}.svg`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageSelect;
