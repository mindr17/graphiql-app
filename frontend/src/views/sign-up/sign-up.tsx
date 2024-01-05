'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Checkbox,
  Chip,
  Input,
  Link,
} from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { GoogleSvg, VkSvg } from '@/components/svg-icons';
import { isTest } from '@/config';

import styles from './sing-up.module.scss';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  agree?: true;
};

const formSchemaTest = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('Please enter password')
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  confirmPassword: yup
    .string()
    .required('Please repaet enter password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  agree: yup.boolean().isTrue('Is required'),
});

const formSchemaProd = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required('Please enter password'),
  confirmPassword: yup
    .string()
    .required('Please repaet enter password'),
  agree: yup.boolean().isTrue('Is required'),
});

const formSchema = isTest ? formSchemaTest : formSchemaProd;

const SignUp: React.FC = () => {
  const { register, control, handleSubmit, formState } =
    useForm<FormValues>({
      resolver: yupResolver(formSchema),
      defaultValues: {
        agree: false as unknown as undefined,
      },
    });

  const errors = formState.errors;

  const onSubmit: SubmitHandler<FormValues> = async (formData) => {
    const { email: formDataEmail, password: formDataPassword } =
      formData;
    const bodyData = {
      email: formDataEmail,
      password: formDataPassword,
    };
    const options: RequestInit = {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyData),
    };

    try {
      const result = await fetch(`/api/sign-up`, options);

      if (!result.ok) {
        throw new Error(result.statusText);
      }

      const data = await result.json();
      const { isSignedUp } = data;
      console.log('isSignedUp: ', isSignedUp);

      if (!isSignedUp) return;

      await signIn('credentials', {
        redirect: true,
        email: formDataEmail,
        password: formDataPassword,
      });
    } catch (error) {
      return;
    }
  };

  return (
    <div>
      <div className={styles.formContainer}>
        <div className={styles.formTop}>
          <h2 className={styles.title}>Sign Up</h2>
          <Link href={'/sign-in'} className={styles.signInButton}>
            sign in
          </Link>
        </div>
        <form
          className={styles.formBody}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            className={styles.input}
            {...register('email')}
            label='Email'
            isInvalid={!!errors?.email}
            errorMessage={errors?.email?.message}
          />
          <Input
            className={styles.input}
            {...register('password')}
            type='password'
            label='Password'
            isInvalid={!!errors?.password}
            errorMessage={errors?.password?.message}
          />
          <Input
            className={styles.input}
            {...register('confirmPassword')}
            type='password'
            label='Repeat password'
            isInvalid={!!errors?.confirmPassword}
            errorMessage={errors?.confirmPassword?.message}
          />
          <div className={styles.formBottom}>
            <Controller
              name='agree'
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <Checkbox
                  color='warning'
                  isSelected={value}
                  isInvalid={!!errors?.agree}
                  onBlur={onBlur}
                  onChange={onChange}
                >
                  <p className={styles.checkoxText}>
                    I agree with{' '}
                    <span className={styles.blueText}>
                      User Agreements, Terms & Conditions
                    </span>{' '}
                    and confirm that over 18 year old
                  </p>
                </Checkbox>
              )}
            />
            <Button
              type='submit'
              className={styles.submitButton}
              radius='md'
              size='lg'
            >
              Sign Up
            </Button>
            <div className={styles.dividerBody}>
              <span className={styles.dividerLeft}></span>
              <Chip className={styles.chip}>Or</Chip>
              <span className={styles.dividerRight}></span>
            </div>
          </div>
        </form>
        <div className={styles.social}>
          <Button className={styles.socialButton}>
            <GoogleSvg />
          </Button>

          <Button className={styles.socialButton}>
            <VkSvg />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
