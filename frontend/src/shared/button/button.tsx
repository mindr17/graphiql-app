import styles from './button.module.css';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  style?: 'red' | 'green';
  classes?: string[];
  title: string;
  disabled?: boolean;
  callback?: () => void;
}

export default function Button(props: ButtonProps): JSX.Element {
  const {
    type = 'button',
    style,
    classes = [],
    title,
    callback,
  } = props;

  return (
    <button
      type={type}
      className={[
        styles.button,
        styles[style ?? ''],
        ...classes,
      ].join(' ')}
      onClick={callback}
    >
      {title}
    </button>
  );
}
