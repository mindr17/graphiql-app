'use client';

import {
  CircularProgress,
  Code,
  ScrollShadow,
} from '@nextui-org/react';

import { useAppSelector } from '@/store/store-hooks';

import ExplorerSchema from '../docs-schema/docs-schema';
import styles from './docs.module.scss';

const ExplorerDocs = () => {
  const { docs, isLoading, error } = useAppSelector(
    (store) => store.docs
  );

  if (isLoading) {
    return (
      <div className={styles.wrapp}>
        <CircularProgress aria-label='Loading...' />
      </div>
    );
  }

  if (error) {
    return (
      <Code color='danger' className={styles.snippet}>
        {error}
      </Code>
    );
  }

  if (!docs) {
    return (
      <Code color='warning' className={styles.snippet}>
        Documentation is empty!
      </Code>
    );
  }

  return (
    <ScrollShadow className={styles.result}>
      <ExplorerSchema />
    </ScrollShadow>
  );
};

export default ExplorerDocs;
