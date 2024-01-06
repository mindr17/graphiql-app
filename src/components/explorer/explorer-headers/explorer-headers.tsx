'use client';

import { Button, Tab, Tabs } from '@nextui-org/react';
import { clsx } from 'clsx';
import { Key, useContext, useState } from 'react';

import {
  ExplorerArrowSvg,
  ExplorerHeadersSvg,
  ExplorerVariablesSvg,
} from '@/components/svg-icons';
import { AppContext } from '@/context/context';
import {
  setHeaders,
  setVariables,
} from '@/store/reducers/explorer/explorer-slice';
import { useAppDispatch, useAppSelector } from '@/store/store-hooks';

import styles from './explorer-headers.module.scss';

const ExplorerHeaders = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>('variables');

  const context = useContext(AppContext);
  const { translations } = context;
  const {
    explorerHeaders,
    explorerVariables,
    explorerHeadersPlaceholder,
    explorerVariablesPlaceholder,
  } = translations;

  const { variables, headers } = useAppSelector(
    (store) => store.explorer
  );

  const dispatch = useAppDispatch();

  return (
    <div
      className={clsx(styles.main, { [styles.mainHide]: !isShow })}
    >
      <div className={styles.actions}>
        <div className={styles.leftBtns}>
          <Tabs
            aria-label='ExplorerHeadersTabs'
            selectedKey={selected}
            onSelectionChange={(key: Key) =>
              setSelected(key.toString())
            }
          >
            <Tab
              key='variables'
              title={
                <div className='flex items-center gap-1.5'>
                  <ExplorerVariablesSvg />
                  <span className={styles.tabs}>
                    {explorerVariables}
                  </span>
                </div>
              }
            />
            <Tab
              key='headers'
              title={
                <div className='flex items-center gap-1.5'>
                  <ExplorerHeadersSvg />
                  <span className={styles.tabs}>
                    {explorerHeaders}
                  </span>
                </div>
              }
            />
          </Tabs>
        </div>
        <Button
          color='default'
          variant='light'
          isIconOnly
          onClick={() => setIsShow(!isShow)}
        >
          <ExplorerArrowSvg isShow={!!isShow} />
        </Button>
      </div>
      {isShow && (
        <>
          {selected === 'variables' && (
            <textarea
              value={variables}
              className={styles.textarea}
              placeholder={explorerVariablesPlaceholder}
              onChange={(e) => dispatch(setVariables(e.target.value))}
            />
          )}
          {selected === 'headers' && (
            <textarea
              value={headers}
              className={styles.textarea}
              placeholder={explorerHeadersPlaceholder}
              onChange={(e) => dispatch(setHeaders(e.target.value))}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ExplorerHeaders;
