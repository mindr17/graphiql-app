'use client';

import {
  CircularProgress,
  ScrollShadow,
  Snippet,
} from '@nextui-org/react';
import CodeEditor from '@uiw/react-textarea-code-editor';

import { useAppSelector } from '@/store/store-hooks';

import styles from './result.module.scss';

const ExplorerResult = () => {
  const { result, isLoading, error } = useAppSelector(
    (store) => store.explorer
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

  if (!result) {
    return (
      <Snippet
        color='warning'
        symbol={''}
        className={styles.snippet}
        hideCopyButton
      >
        Enter the api url, please!
      </Snippet>
    );
  }

  return (
    <ScrollShadow className={styles.result}>
      <CodeEditor
        value={result}
        language='json'
        className={styles.textarea}
        readOnly={true}
        padding={15}
        data-color-mode='dark'
        style={{
          fontFamily: 'inherit',
          fontSize: '16px',
          background: 'inherit',
        }}
      />
    </ScrollShadow>
  );
};

export default ExplorerResult;
