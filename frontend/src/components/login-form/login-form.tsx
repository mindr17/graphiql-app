'use client';

import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import type { FormEventHandler } from 'react';

import GoogleButton from '../google-button';
import classes from './login-form.module.css';

const LoginForm: React.FC = () => {
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });

    if (res && !res.error) {
      router.push('/profile');
    } else {
      console.log(res);
    }
  };

  return (
    <form className={classes.loginForm} onSubmit={handleSubmit}>
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
