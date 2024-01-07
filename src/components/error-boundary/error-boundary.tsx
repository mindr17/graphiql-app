import { Button } from '@nextui-org/react';
import { FC, useContext } from 'react';

import { AppContext } from '@/context/context';

import styles from './error-boundary.module.scss';

interface ErrorBoundaryProps {
  onReset: () => void;
}

const ErrorBoundary: FC<ErrorBoundaryProps> = (props) => {
  const { onReset } = props;

  const context = useContext(AppContext);
  const { translations } = context;
  const { errorBoundaryTitle, errorBoundaryBtn } = translations;

  return (
    <section className={styles.main}>
      <div className={styles.wrapper}>
        <h1>{errorBoundaryTitle}</h1>
        <Button
          color='default'
          variant='solid'
          className={styles.btn}
          onClick={onReset}
        >
          {errorBoundaryBtn}
        </Button>
      </div>
    </section>
  );
};

export default ErrorBoundary;
