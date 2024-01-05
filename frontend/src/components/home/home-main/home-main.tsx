'use client';

import { Button } from '@nextui-org/button';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useContext } from 'react';

import bg from '@/assets/main-bg.png';
import { AppContext } from '@/context/context';

import styles from './home-main.module.scss';

const HomeMain = () => {
  const session = useSession();
  const { data: seeeionData } = session;
  const router = useRouter();
  const context = useContext(AppContext);
  const { translations } = context;
  const { mainTitle, mainSubTitle, mainBtn } = translations;

  return (
    <section className={styles.mainSection}>
      <div
        className={styles.mainSectionBg}
        style={{
          background: `url(${bg.src}) 50% / cover no-repeat`,
        }}
      />
      <div className={styles.mainSectionWrapp}>
        <Image
          className={styles.mainSectionWrappImg}
          src='/main-graph.png'
          alt='main-graph'
          width={100}
          height={100}
        />
        <div className={styles.mainSectionText}>
          <h1>{mainTitle}</h1>
          <h3>{mainSubTitle}</h3>
        </div>

        <div className={styles.mainSectionBtn}>
          <Button
            color='secondary'
            variant='ghost'
            onClick={() =>
              router.push(seeeionData ? '/explorer' : '/sign-in')
            }
          >
            {mainBtn}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HomeMain;
