'use client';

import { Button, Link } from '@nextui-org/react';
import { FC, useContext } from 'react';

import { NotFoundSvg } from '@/components/svg-icons';
import { AppContext } from '@/context/context';

import styles from './not-found.module.scss';

const NotFound: FC = () => {
  const context = useContext(AppContext);
  const { translations } = context;
  const { notFoundTitile, notFoundBtn } = translations;

  return (
    <section className={styles.main}>
      <div className={styles.wrapp}>
        <NotFoundSvg />
        <h1 className={styles.title}>{notFoundTitile}</h1>
        <Button
          href='/'
          as={Link}
          color='default'
          variant='ghost'
          className={styles.link}
        >
          {notFoundBtn}
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
