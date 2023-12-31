'use client';

import { useContext } from 'react';

import { AppContext } from '@/context/context';
import {
  MAIN_ABOUT_INFO_EN,
  MAIN_ABOUT_INFO_RU,
} from '@/shared/constants';

import styles from './home-about.module.scss';

const HomeAbout = () => {
  const context = useContext(AppContext);
  const { translations, locale } = context;
  const { mainAboutTitle } = translations;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{mainAboutTitle}</h2>

      <div>
        <p>
          {locale === 'en' ? MAIN_ABOUT_INFO_EN : MAIN_ABOUT_INFO_RU}
        </p>
      </div>
    </section>
  );
};

export default HomeAbout;
