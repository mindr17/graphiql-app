'use client';

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import clsx from 'clsx';
import { useState } from 'react';

import styles from './explorer-send.module.css';

interface ExplorerSendProps {
  cl?: string;
}

const ExplorerSend = (props: ExplorerSendProps) => {
  const [variant, setVariant] = useState<string>('POST');
  const crudVariants = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

  const { cl } = props;

  return (
    <div className={clsx(styles.wrapper, cl)}>
      <Dropdown>
        <DropdownTrigger>
          <Button
            color='default'
            variant='light'
            className={styles.btn}
          >
            {variant}
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label='ExplorerSend Menu'>
          {crudVariants.map((item) => (
            <DropdownItem key={item} onClick={() => setVariant(item)}>
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
      <Button color='success'>Send</Button>
    </div>
  );
};

export default ExplorerSend;
