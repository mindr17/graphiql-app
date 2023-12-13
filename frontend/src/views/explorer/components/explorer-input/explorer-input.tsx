'use client';

import { Button, Input } from '@nextui-org/react';

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
        className={styles.btn}
      >
        Try other explorers
      </Button>

      <ExplorerInputMore cl={styles.more} />
    </div>
  );
};

export default ExplorerInput;
