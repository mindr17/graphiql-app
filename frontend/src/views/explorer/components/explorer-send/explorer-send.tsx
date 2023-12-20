'use client';

import { Button } from '@nextui-org/react';
import clsx from 'clsx';
import { useContext } from 'react';

import { AppContext } from '@/context/context';

import styles from './explorer-send.module.css';

interface ExplorerSendProps {
  cl?: string;
}

const ExplorerSend = (props: ExplorerSendProps) => {
  const { cl } = props;

  const context = useContext(AppContext);
  const { translations } = context;
  const { explorerSend } = translations;

  return (
    <div className={clsx(styles.wrapper, cl)}>
      <Button color='success'>{explorerSend}</Button>
    </div>
  );
};

export default ExplorerSend;
