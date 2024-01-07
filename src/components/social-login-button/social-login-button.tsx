'use client';

import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';

import { Icon } from '@/app/Icon/Icon';

import styles from './social-login-button.module.scss';
import { IProvider } from './types';

interface Props {
  provider: IProvider;
}

const SocialLoginButton = (props: Props): JSX.Element => {
  const { provider } = props;
  const { name: providerName, iconHtml = '' } = provider;

  const handleClick = async () => {
    await signIn(providerName, {
      callbackUrl: '/explorer',
      redirect: true,
    });
  };

  return (
    <Button className={styles.container} onClick={handleClick}>
      {iconHtml ? <Icon html={iconHtml} /> : providerName}
    </Button>
  );
};

export default SocialLoginButton;
