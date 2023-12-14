'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Checkbox, Chip, Input } from '@nextui-org/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import { GoogleSvg, VkSvg } from '@/components/svg-icons';

import s from './sing-up.module.scss';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  agree?: true;
};

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('Please enter password')
    .matches(
      /[a-z]/,
      'Password can only contain lowercase latin letters.'
    )
    .matches(
      /[A-Z]/,
      'Password can only contain upercase latin letters.'
    )
    .min(8, 'Password is too short - should be 8 chars minimum.'),
  confirmPassword: yup
    .string()
    .required('Please repaet enter password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
  agree: yup.boolean().isTrue('Is required'),
});

const SignUp: React.FC = () => {
  const { register, control, handleSubmit, formState } =
    useForm<FormValues>({
      resolver: yupResolver(formSchema),
      defaultValues: {
        agree: false as unknown as undefined,
      },
    });

  const errors = formState.errors;

  const onSubmit: SubmitHandler<FormValues> = (data) =>
    console.log(data);

  return (
    <div>
      <div className={s.formContainer}>
        <div className={s.formTop}>
          <h2 className={s.title}>Sign Up</h2>
          <Button className={s.signInButton} radius='full'>
            sign in
          </Button>
        </div>
        <form
          className={s.formBody}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            className={s.input}
            {...register('email')}
            label='Email'
            isInvalid={!!errors?.email}
            errorMessage={errors?.email?.message}
          />
          <Input
            className={s.input}
            {...register('password')}
            type='password'
            label='Password'
            isInvalid={!!errors?.password}
            errorMessage={errors?.password?.message}
          />
          <Input
            className={s.input}
            {...register('confirmPassword')}
            type='password'
            label='Repeat password'
            isInvalid={!!errors?.confirmPassword}
            errorMessage={errors?.confirmPassword?.message}
          />
          <div className={s.formBottom}>
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
                  <p className={s.checkoxText}>
                    I agree with{' '}
                    <span className={s.blueText}>
                      User Agreements, Terms & Conditions
                    </span>{' '}
                    and confirm that over 18 year old
                  </p>
                </Checkbox>
              )}
            />
            <Button
              type='submit'
              className={s.submitButton}
              radius='md'
              size='lg'
            >
              Sign Up
            </Button>
            <div className={s.dividerBody}>
              <span className={s.dividerLeft}></span>
              <Chip className={s.chip}>Or</Chip>
              <span className={s.dividerRight}></span>
            </div>
          </div>
        </form>
        <div className={s.social}>
          <Button className={s.socialButton}>
            <GoogleSvg />
          </Button>

          <Button className={s.socialButton}>
            <VkSvg />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
