'use client';

import { Button, Tab, Tabs } from '@nextui-org/react';
import clsx from 'clsx';
import { Key, useContext, useState } from 'react';

import {
  ExplorerArrowSvg,
  ExplorerHeadersSvg,
  ExplorerVariablesSvg,
} from '@/components/svg-icons';
import { AppContext } from '@/context/context';

import styles from './explorer-headers.module.css';

const ExplorerHeaders = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>('headers');

  const context = useContext(AppContext);
  const { translations } = context;
  const {
    explorerHeaders,
    explorerVariables,
    explorerHeadersPlaceholder,
    explorerVariablesPlaceholder,
  } = translations;

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
          {selected === 'headers' && (
            <textarea
              className={styles.textarea}
              placeholder={explorerHeadersPlaceholder}
            />
          )}
          {selected === 'variables' && (
            <textarea
              className={styles.textarea}
              placeholder={explorerVariablesPlaceholder}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ExplorerHeaders;
