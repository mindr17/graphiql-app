'use client';

import { Button, Tab, Tabs } from '@nextui-org/react';
import clsx from 'clsx';
import { Key, useState } from 'react';

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
            <Tab key='headers' title='Headers' />
            <Tab key='variables' title='Variables' />
          </Tabs>
        </div>
        <Button
          color='default'
          variant='bordered'
          onClick={() => setIsShow(!isShow)}
        >
          {isShow ? 'hide' : 'show'}
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
