'use client';

import { Button } from '@nextui-org/react';
import { clsx } from 'clsx';
import { useContext } from 'react';
import { toast } from 'sonner';

import { AppContext } from '@/context/context';
import { explorerFetchDocs } from '@/store/reducers/docs/docs-actions';
import { explorerFetchResult } from '@/store/reducers/explorer/explorer-actions';
import { useAppDispatch, useAppSelector } from '@/store/store-hooks';
import { checkValues } from '@/utils/check-values';

import styles from './explorer-send.module.scss';

interface ExplorerSendProps {
  cl?: string;
}

const ExplorerSend = (props: ExplorerSendProps) => {
  const { cl } = props;

  const context = useContext(AppContext);
  const { translations } = context;
  const {
    explorerSend,
    explorerVariablesError,
    explorerHeadersError,
  } = translations;

  const { url, query, isLoading, variables, headers } =
    useAppSelector((store) => store.explorer);

  const dispatch = useAppDispatch();

  const handleSendUrl = () => {
    if (url.trim() !== '') {
      const isCorrectVariables =
        variables.trim() !== '' ? checkValues(variables) : true;
      const isCorrectHeaders =
        headers.trim() !== '' ? checkValues(headers) : true;

      if (!isCorrectVariables) {
        toast.error(explorerVariablesError);
      } else if (!isCorrectHeaders) {
        toast.error(explorerHeadersError);
      }

      dispatch(
        explorerFetchResult({
          url,
          query,
          variables: isCorrectVariables ? variables : '',
          headers: isCorrectHeaders ? variables : null,
        })
      );
      dispatch(explorerFetchDocs({ url }));
    }
  };

  return (
    <div className={clsx(styles.wrapper, cl)}>
      <Button
        color='success'
        isLoading={isLoading}
        isDisabled={url.trim() === ''}
        className={styles.button}
        onClick={handleSendUrl}
      >
        {explorerSend}
      </Button>
    </div>
  );
};

export default ExplorerSend;
