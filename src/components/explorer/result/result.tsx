'use client';

import {
  CircularProgress,
  Code,
  ScrollShadow,
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
      <Code color='danger' className={styles.snippet}>
        {error}
      </Code>
    );
  }

  if (!result) {
    return (
      <Code color='warning' className={styles.snippet}>
        Enter the api url, please!
      </Code>
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
