import ExplorerResult from '@/components/explorer/explorer-actions/explorer-actions';
import ExplorerBody from '@/components/explorer/explorer-body/explorer-body';
import ExplorerHeaders from '@/components/explorer/explorer-headers/explorer-headers';
import ExplorerInput from '@/components/explorer/explorer-input/explorer-input';
import ExplorerSend from '@/components/explorer/explorer-send/explorer-send';
import { protectPageFrom } from '@/helpers/auth/protect-page-from';

import styles from './explorer.module.scss';

const Explorer: React.FC = async () => {
  await protectPageFrom('unauthorized');

  return (
    <section className={styles.main}>
      <ExplorerInput />
      <div className={styles.contentWrapp}>
        <div className={styles.textareaLeft}>
          <ExplorerBody />
          <ExplorerHeaders />
        </div>
        <ExplorerResult />
        <ExplorerSend cl={styles.send} />
      </div>
    </section>
  );
};

export default Explorer;
