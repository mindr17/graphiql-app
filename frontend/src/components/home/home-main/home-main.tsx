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
  const router = useRouter();

  const context = useContext(AppContext);
  const { translations } = context;
  const { mainTitle, mainSubTitle } = translations;

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
          {session?.data ? (
            <Button
              color='secondary'
              variant='ghost'
              onClick={() => router.push('/explorer')}
            >
              Get started
            </Button>
          ) : (
            <Button
              color='secondary'
              variant='ghost'
              onClick={() => router.push('/signin')}
            >
              Get started
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default HomeMain;
