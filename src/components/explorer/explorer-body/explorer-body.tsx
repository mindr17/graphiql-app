'use client';

import { Button } from '@nextui-org/react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { useContext } from 'react';
import { toast } from 'sonner';

import { ExplorerPrettifyingSvg } from '@/components/svg-icons';
import { AppContext } from '@/context/context';
import {
  EDITOR_PLACEHOLDER_EN,
  EDITOR_PLACEHOLDER_RU,
} from '@/shared/constants';
import {
  setPrettifyQuery,
  setQuery,
} from '@/store/reducers/explorer/explorer-slice';
import { useAppDispatch, useAppSelector } from '@/store/store-hooks';
import { prettifying } from '@/utils/prettifying';

import styles from './explorer-body.module.scss';

const ExplorerBody = () => {
  const context = useContext(AppContext);
  const { locale, translations } = context;
  const { explorerPrettifyingSuccess } = translations;

  const { query, isPrettifyQuery } = useAppSelector(
    (store) => store.explorer
  );

  const dispatch = useAppDispatch();

  const handlePrettifying = () => {
    const newQuery = prettifying(query);
    dispatch(setPrettifyQuery(newQuery));
    toast.success(explorerPrettifyingSuccess);
  };

  return (
    <>
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
      <Button
        color='default'
        variant='shadow'
        className={styles.btn}
        isDisabled={!isPrettifyQuery}
        isIconOnly
        onClick={handlePrettifying}
      >
        <ExplorerPrettifyingSvg />
      </Button>
    </>
  );
};

export default ExplorerBody;
