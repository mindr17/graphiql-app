'use client';

import { Tab, Tabs } from '@nextui-org/react';
import { Key, useState } from 'react';

import styles from './explorer-result.module.css';

const ExplorerResult = () => {
  const [selected, setSelected] = useState<string>('headers');

  return (
    <div className={styles.main}>
      <div className={styles.actions}>
        <Tabs
          aria-label='ExplorerResultTabs'
          selectedKey={selected}
          onSelectionChange={(key: Key) =>
            setSelected(key.toString())
          }
        >
          <Tab key='result' title='Result' />
          <Tab key='docs' title='Docs' />
        </Tabs>
      </div>
      <>
        {selected === 'result' && (
          <textarea
            className={styles.textarea}
            placeholder='Test Result text'
            readOnly
          />
        )}
        {selected === 'docs' && (
          <textarea
            className={styles.textarea}
            placeholder='Test Docs text'
            readOnly
          />
        )}
      </>
    </div>
  );
};

export default ExplorerResult;
