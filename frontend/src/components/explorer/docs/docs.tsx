'use client';

import {
  CircularProgress,
  ScrollShadow,
  Snippet,
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
      <Snippet
        color='danger'
        symbol={''}
        className={styles.snippet}
        hideCopyButton
      >
        {error}
      </Snippet>
    );
  }

  if (!docs) {
    return (
      <Snippet
        color='warning'
        symbol={''}
        className={styles.snippet}
        hideCopyButton
      >
        Documentation is empty!
      </Snippet>
    );
  }

  return (
    <ScrollShadow className={styles.result}>
      <ExplorerSchema />
    </ScrollShadow>
  );
};

export default ExplorerDocs;
