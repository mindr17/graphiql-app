'use client';

import { useContext } from 'react';

import { AppContext } from '@/context/context';
import {
  EDITOR_PLACEHOLDER_EN,
  EDITOR_PLACEHOLDER_RU,
} from '@/shared/constants';

import styles from './explorer-body.module.css';

const ExplorerBody = () => {
  const context = useContext(AppContext);
  const { locale } = context;

  return (
    <textarea
      className={styles.textarea}
      placeholder={
        locale === 'en'
          ? EDITOR_PLACEHOLDER_EN
          : EDITOR_PLACEHOLDER_RU
      }
    />
  );
};

export default ExplorerBody;
