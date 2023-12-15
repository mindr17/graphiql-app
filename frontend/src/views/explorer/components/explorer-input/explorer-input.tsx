'use client';

import { Button, Input } from '@nextui-org/react';

import {
  ExplorerCatalogSvg,
  ExplorerOtherSvg,
} from '@/components/svg-icons';

import ExplorerSend from '../explorer-send/explorer-send';
import styles from './explorer-input.module.css';
import ExplorerInputMore from './explorer-input-more';

const ExplorerInput = () => {
  return (
    <div className={styles.wrapper}>
      <Button
        color='default'
        variant='bordered'
        className={styles.btn}
        startContent={<ExplorerCatalogSvg />}
      >
        Api catalog
      </Button>
      <div className={styles.inputWrapp}>
        <Input
          type='text'
          variant='bordered'
          labelPlacement='outside'
          placeholder='Enter the URL'
        />
        <div className={styles.inputAction}>
          <ExplorerSend />
        </div>
      </div>
      <Button
        color='default'
        variant='bordered'
        className={styles.btnOther}
        startContent={<ExplorerOtherSvg />}
      >
        Try other explorers
      </Button>

      <div className={styles.more}>
        <ExplorerInputMore />
      </div>
    </div>
  );
};

export default ExplorerInput;
