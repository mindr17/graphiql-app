import { Button, Checkbox, Chip, Input } from '@nextui-org/react';

import { GoogleSvg, VkSvg } from '@/components/svg-icons';

import s from './sing-up.module.scss';

const SignUp: React.FC = () => {
  return (
    <div>
      <div className={s.formContainer}>
        <div className={s.formTop}>
          <h2 className={s.title}>Sign Up</h2>
          <Button className={s.signInButton} radius='full'>
            sign in
          </Button>
        </div>
        <div className={s.formBody}>
          <Input className={s.input} type='email' label='Email' />
          <Input
            className={s.input}
            type='password'
            label='Password'
          />
          <Input
            className={s.input}
            type='password'
            label='Repeat password'
          />
        </div>
        <div className={s.formBottom}>
          <Checkbox className={s.checkbox} color='default' size='md'>
            I agree with{' '}
            <span className={s.blueText}>
              User Agreements, Terms & Conditions
            </span>{' '}
            and confirm that over 18 year old
          </Checkbox>
          <Button className={s.submitButton} radius='md' size='lg'>
            Sign Up
          </Button>
          <div className={s.dividerBody}>
            <span className={s.dividerLeft}></span>
            <Chip className={s.chip}>Or</Chip>
            <span className={s.dividerRight}></span>
          </div>
        </div>
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
