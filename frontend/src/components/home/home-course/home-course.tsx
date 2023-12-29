'use client';

import Link from 'next/link';
import { useContext } from 'react';

import { AppContext } from '@/context/context';

import styles from './home-course.module.scss';

const HomeCourse = () => {
  const context = useContext(AppContext);
  const { translations } = context;
  const { mainCourseText } = translations;

  return (
    <section className={styles.section}>
      <div className={styles.wrapp}>
        <Link
          href='https://rs.school/react/'
          target='_blank'
          rel='noopener noreferrer'
          className={styles.link}
        />
        <p className={styles.text}>{mainCourseText}</p>
      </div>
    </section>
  );
};

export default HomeCourse;
