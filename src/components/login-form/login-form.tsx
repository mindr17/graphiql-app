'use client';

import { Button, Input } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import type { FormEventHandler } from 'react';

import GoogleButton from '../google-button';
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
      callbackUrl: '/',
    });
  };

  return (
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
      <Button type='submit'>Sign In</Button>
      <GoogleButton />
    </form>
  );
};

export default LoginForm;
