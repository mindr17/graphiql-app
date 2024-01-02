'use client';

import { ScrollShadow } from '@nextui-org/react';
import CodeEditor from '@uiw/react-textarea-code-editor';
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
    <ScrollShadow className={styles.result}>
      <CodeEditor
        value={query}
        language='graphql'
        className={styles.textarea}
        padding={15}
        data-color-mode='dark'
        style={{
          fontFamily: 'inherit',
          fontSize: '16px',
          background: 'inherit',
        }}
        placeholder={
          locale === 'en'
            ? EDITOR_PLACEHOLDER_EN
            : EDITOR_PLACEHOLDER_RU
        }
        onChange={(e) => dispatch(setQuery(e.target.value))}
      />
    </ScrollShadow>
  );
};

export default ExplorerBody;
