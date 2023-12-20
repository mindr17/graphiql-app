'use client';

import { Button, Input } from '@nextui-org/react';
import { useContext } from 'react';

import { ExplorerCatalogSvg } from '@/components/svg-icons';
import { AppContext } from '@/context/context';

import ExplorerSend from '../explorer-send/explorer-send';
import styles from './explorer-input.module.scss';

const ExplorerInput = () => {
  const context = useContext(AppContext);
  const { translations } = context;
  const { explorerCatalog, explorerInput } = translations;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapp}>
        <Input
          type='text'
          variant='bordered'
          labelPlacement='outside'
          placeholder={explorerInput}
        />
        <div className={styles.inputAction}>
          <ExplorerSend />
        </div>
      </div>
      <Button
        color='default'
        variant='bordered'
        className={styles.btn}
        startContent={<ExplorerCatalogSvg />}
      >
        <span>{explorerCatalog}</span>
      </Button>
    </div>
  );
};

export default ExplorerInput;
