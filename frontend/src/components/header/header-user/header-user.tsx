'use client';

import { Button, ButtonGroup } from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useContext } from 'react';

import { AppContext } from '@/context/context';

const HeaderUser = () => {
  const session = useSession();
  const pathname = usePathname();

  const context = useContext(AppContext);
  const { translations } = context;
  const { signIn, signUp } = translations;

  return (
    <>
      {session?.data && <Link href='/profile'>Profile</Link>}
      {session?.data ? (
        <Link href='#' onClick={() => signOut({ callbackUrl: '/' })}>
          Sign Out
        </Link>
      ) : (
        <div>
          <ButtonGroup>
            <Button
              href='/signIn'
              as={Link}
              isDisabled={pathname === '/signIn'}
            >
              {signIn}
            </Button>
            <Button
              href='/signup'
              as={Link}
              isDisabled={pathname === '/signup'}
            >
              {signUp}
            </Button>
          </ButtonGroup>
        </div>
      )}
    </>
  );
};

export default HeaderUser;
