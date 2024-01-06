'use client';

import Image from 'next/image';
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

  const text =
    locale === 'en' ? MAIN_ABOUT_INFO_EN : MAIN_ABOUT_INFO_RU;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{mainAboutTitle}</h2>

      <div className={styles.wrapp}>
        <p
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: text }}
        />
        <Image
          className={styles.img}
          src='/about-project.png'
          alt='about-project'
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default HomeAbout;
