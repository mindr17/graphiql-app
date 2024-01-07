'use client';

import { Button, Chip, Input, Link } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import type { FormEventHandler } from 'react';

import { socialProviders } from '@/helpers/auth/enabled-providers';

import SocialLoginButton from '../social-login-button/social-login-button';
import styles from './login-form.module.scss';

const LoginForm: React.FC = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: true,
      callbackUrl: '/explorer',
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formTop}>
        <h2 className={styles.title}>Sign In</h2>
        <Link href={'/sign-up'} className={styles.signInButton}>
          sign up
        </Link>
      </div>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <Input
          label='Email'
          placeholder='Enter your email'
          type='email'
          name='email'
          required
        />
        <Input
          label='Password'
          placeholder='Enter your password'
          type='password'
          name='password'
          required
        />
        <Button className={styles.actionButton} type='submit'>
          Sign In
        </Button>
        <div className={styles.dividerBody}>
          <span className={styles.dividerLeft}></span>
          <Chip className={styles.chip}>Or</Chip>
          <span className={styles.dividerRight}></span>
        </div>
        <div className={styles.social}>
          {socialProviders.map((provider) => (
            <SocialLoginButton
              provider={provider}
              key={provider.name}
            />
          ))}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
