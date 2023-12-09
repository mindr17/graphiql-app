'use client';

import { Button } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

const GoogleButton: React.FC = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';

  return (
    <Button
      variant='flat'
      color='primary'
      onClick={() => signIn('google', { callbackUrl })}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleButton;
