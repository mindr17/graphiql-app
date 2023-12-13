import ExplorerBody from './components/explorer-body/explorer-body';
import ExplorerHeaders from './components/explorer-headers/explorer-headers';
import ExplorerInput from './components/explorer-input/explorer-input';
import ExplorerResult from './components/explorer-result/explorer-result';
import ExplorerSend from './components/explorer-send/explorer-send';
import styles from './explorer.module.css';

const Explorer: React.FC = () => {
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
