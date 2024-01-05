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
  const { data: sessionData } = session;

  return (
    <>
      {sessionData ? (
        <>
          <Link href='/profile'>Profile</Link>
          <Link
            href='#'
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            Sign Out
          </Link>
        </>
      ) : (
        <div>
          <ButtonGroup data-testid='header-auth-btns'>
            <Button
              href='/sign-in'
              as={Link}
              isDisabled={pathname === '/sign-in'}
            >
              {signIn}
            </Button>
            <Button
              href='/sign-up'
              as={Link}
              isDisabled={pathname === '/sign-up'}
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
