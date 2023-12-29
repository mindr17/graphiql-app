'use client';

import { useContext } from 'react';

import { AppContext } from '@/context/context';

import styles from './home-team.module.scss';

const HomeTeam = () => {
  const context = useContext(AppContext);
  const { translations } = context;
  const { mainTeamTitle } = translations;

  return (
    <section className={styles.section}>
      <h2>{mainTeamTitle}</h2>
    </section>
  );
};

export default HomeTeam;
