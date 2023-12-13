import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react';
import clsx from 'clsx';

import styles from './explorer-input.module.css';

const ExplorerInputMore = () => {
  return (
    <Dropdown className={styles.more}>
      <DropdownTrigger>
        <Button
          variant='bordered'
          className={clsx(styles.more, styles.moreBtn)}
        >
          More
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label='Example with disabled actions'
        disabledKeys={['edit', 'delete']}
      >
        <DropdownItem key='api-catalog'>Api catalog</DropdownItem>
        <DropdownItem key='other-explorers'>
          Try other explorers
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ExplorerInputMore;
