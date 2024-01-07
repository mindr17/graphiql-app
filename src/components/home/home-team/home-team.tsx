'use client';

import { useContext } from 'react';

import { AppContext } from '@/context/context';
import {
  MAIN_TEAM_LIST_EN,
  MAIN_TEAM_LIST_RU,
} from '@/shared/constants';

import styles from './home-team.module.scss';
import HomeTeamCard from './home-team-card';

const HomeTeam = () => {
  const context = useContext(AppContext);
  const { translations, locale } = context;
  const { mainTeamTitle, mainTeamLinkText } = translations;

  const list =
    locale === 'en' ? MAIN_TEAM_LIST_EN : MAIN_TEAM_LIST_RU;

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>{mainTeamTitle}</h2>
      <div className={styles.grid}>
        {list.map((item, index) => (
          <HomeTeamCard
            name={item.name}
            github={item.github}
            role={item.role}
            bio={item.bio}
            link={mainTeamLinkText}
            key={index}
          />
        ))}
      </div>
    </section>
  );
};

export default HomeTeam;
