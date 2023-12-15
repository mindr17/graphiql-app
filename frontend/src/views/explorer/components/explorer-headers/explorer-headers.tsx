'use client';

import { Button, Tab, Tabs } from '@nextui-org/react';
import clsx from 'clsx';
import { Key, useState } from 'react';

import {
  ExplorerArrowSvg,
  ExplorerHeadersSvg,
  ExplorerVariablesSvg,
} from '@/components/svg-icons';

import styles from './explorer-headers.module.css';

const ExplorerHeaders = () => {
  const [isShow, setIsShow] = useState<boolean>(true);
  const [selected, setSelected] = useState<string>('headers');

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
                  <span>Headers</span>
                </div>
              }
            />
            <Tab
              key='variables'
              title={
                <div className='flex items-center gap-1.5'>
                  <ExplorerVariablesSvg />
                  <span>Variables</span>
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
              placeholder='Test Headers text'
            />
          )}
          {selected === 'variables' && (
            <textarea
              className={styles.textarea}
              placeholder='Test Variables text'
            />
          )}
        </>
      )}
    </div>
  );
};

export default ExplorerHeaders;
