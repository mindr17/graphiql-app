'use client';

import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';

import { GoogleSvg } from '../svg-icons';
import styles from './google-button.module.scss';

const GoogleButton: React.FC = () => {
  const handleClick = async () => {
    await signIn('google', {
      callbackUrl: '/explorer',
      redirect: true,
    });
  };

  return (
    <Button className={styles.socialButton} onClick={handleClick}>
      <GoogleSvg />
    </Button>
  );
};

export default GoogleButton;
