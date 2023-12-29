'use client';

import { useContext } from 'react';

import { AppContext } from '@/context/context';
import {
  EDITOR_PLACEHOLDER_EN,
  EDITOR_PLACEHOLDER_RU,
} from '@/shared/constants';
import { setQuery } from '@/store/reducers/explorer/explorer-slice';
import { useAppDispatch, useAppSelector } from '@/store/store-hooks';

import styles from './explorer-body.module.css';

const ExplorerBody = () => {
  const context = useContext(AppContext);
  const { locale } = context;

  const { query } = useAppSelector((store) => store.explorer);

  const dispatch = useAppDispatch();

  return (
    <textarea
      className={styles.textarea}
      placeholder={
        locale === 'en'
          ? EDITOR_PLACEHOLDER_EN
          : EDITOR_PLACEHOLDER_RU
      }
      value={query}
      onChange={(e) => dispatch(setQuery(e.target.value))}
    />
  );
};

export default ExplorerBody;
