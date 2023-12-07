import styles from './button.module.css';

interface ButtonProps {
  type?: 'submit' | 'reset' | 'button';
  style?: 'red' | 'green';
  classes?: string[];
  title: string;
  disabled?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export default function Button(props: ButtonProps): JSX.Element {
  const {
    type = 'button',
    style,
    classes = [],
    title,
    onClick = () => {},
  } = props;

  return (
    <button
      type={type}
      className={[
        styles.button,
        styles[style ?? ''],
        ...classes,
      ].join(' ')}
      onClick={onClick}
    >
      {title}
    </button>
  );
}
