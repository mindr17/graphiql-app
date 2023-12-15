import { EDITOR_PLACEHOLDER } from '@/shared/constants';

import styles from './explorer-body.module.css';

const ExplorerBody = () => {
  return (
    <textarea
      className={styles.textarea}
      placeholder={EDITOR_PLACEHOLDER}
    />
  );
};

export default ExplorerBody;
