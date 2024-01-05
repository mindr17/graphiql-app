'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { FC } from 'react';

import styles from './profile.module.scss';

const Profile: FC = () => {
  const session = useSession();
  const { status } = session;
  const isAuthenticated = status === 'authenticated';

  return (
    <div className={styles.container}>
      <h1>Profile (CSR)</h1>
      {isAuthenticated ? (
        <div>
          <p>User: {session.data.user?.name}</p>
          <p>Email: {session.data.user?.email}</p>
          <Button color='secondary' onClick={() => signOut()}>
            Sign out
          </Button>
        </div>
      ) : (
        <Link href='/api/auth/signin'>SignIn</Link>
      )}
    </div>
  );
};

export default Profile;
