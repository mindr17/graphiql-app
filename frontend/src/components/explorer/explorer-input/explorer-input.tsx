'use client';

import { Input } from '@nextui-org/react';
import { useContext } from 'react';

import { AppContext } from '@/context/context';
import { setUrl } from '@/store/reducers/explorer/explorer-slice';
import { useAppDispatch, useAppSelector } from '@/store/store-hooks';

import ExplorerSend from '../explorer-send/explorer-send';
import styles from './explorer-input.module.scss';

const ExplorerInput = () => {
  const context = useContext(AppContext);
  const { translations } = context;
  const { explorerInput } = translations;

  const { url } = useAppSelector((store) => store.explorer);

  const dispatch = useAppDispatch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputWrapp}>
        <Input
          type='text'
          variant='bordered'
          labelPlacement='outside'
          value={url}
          placeholder={explorerInput}
          onChange={(e) => dispatch(setUrl(e.target.value))}
        />
        <div className={styles.inputAction}>
          <ExplorerSend />
        </div>
      </div>
    </div>
  );
};

export default ExplorerInput;
