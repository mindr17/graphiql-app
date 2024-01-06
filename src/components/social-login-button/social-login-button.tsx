'use client';

import { Button } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

import styles from './social-login-button.module.scss';

interface Props {
  provider?: 'vk' | 'google' | 'github';
}

const SocialLoginButton = (props: Props): JSX.Element => {
  const { provider } = props;
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/explorer';

  const handleClick = () => signIn(provider, { callbackUrl });

  return (
    <Button className={styles.socialButton} onClick={handleClick}>
      {provider}
    </Button>
  );
};

export default SocialLoginButton;
