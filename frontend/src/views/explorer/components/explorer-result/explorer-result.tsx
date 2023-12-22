'use client';

import { Tab, Tabs } from '@nextui-org/react';
import { Key, useContext, useState } from 'react';

import {
  ExplorerDocsSvg,
  ExplorerResultSvg,
} from '@/components/svg-icons';
import { AppContext } from '@/context/context';

import styles from './explorer-result.module.css';

const ExplorerResult = () => {
  const [selected, setSelected] = useState<string>('headers');

  const context = useContext(AppContext);
  const { translations } = context;
  const { explorerResult, explorerDocs } = translations;

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
          <Tab
            key='result'
            title={
              <div className='flex items-center gap-1.5'>
                <ExplorerResultSvg />
                <span className={styles.tabs}>{explorerResult}</span>
              </div>
            }
          />
          <Tab
            key='docs'
            title={
              <div className='flex items-center gap-1.5'>
                <ExplorerDocsSvg />
                <span className={styles.tabs}>{explorerDocs}</span>
              </div>
            }
          />
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
