'use client';

import { Button } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { GoogleSvg } from '../svg-icons';
import styles from './google-button.module.scss';

const GoogleButton: React.FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/explorer';

  const handleClick = () => signIn('google', { callbackUrl });

  return (
    <Button className={styles.socialButton} onClick={handleClick}>
      <GoogleSvg />
    </Button>
  );
};

export default GoogleButton;
