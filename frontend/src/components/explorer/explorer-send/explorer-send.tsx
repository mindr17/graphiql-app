'use client';

import { Button } from '@nextui-org/react';
import { clsx } from 'clsx';
import { useContext } from 'react';

import { AppContext } from '@/context/context';
import { explorerFetchDocs } from '@/store/reducers/docs/docs-actions';
import { explorerFetchResult } from '@/store/reducers/explorer/explorer-actions';
import { useAppDispatch, useAppSelector } from '@/store/store-hooks';

import styles from './explorer-send.module.css';

interface ExplorerSendProps {
  cl?: string;
}

const ExplorerSend = (props: ExplorerSendProps) => {
  const { cl } = props;

  const context = useContext(AppContext);
  const { translations } = context;
  const { explorerSend } = translations;

  const { url, query, isLoading } = useAppSelector(
    (store) => store.explorer
  );

  const dispatch = useAppDispatch();

  const handleSendUrl = () => {
    if (url.trim() !== '') {
      dispatch(explorerFetchResult({ url, query }));
      dispatch(explorerFetchDocs({ url }));
    }
  };

  return (
    <div className={clsx(styles.wrapper, cl)}>
      <Button
        color='success'
        isLoading={isLoading}
        onClick={handleSendUrl}
      >
        {explorerSend}
      </Button>
    </div>
  );
};

export default ExplorerSend;
