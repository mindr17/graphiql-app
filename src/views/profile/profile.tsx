'use client';

import { Button } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { FC } from 'react';

import styles from './profile.module.scss';

const Profile: FC = () => {
  const session = useSession();
  const { status } = session;
  const isAuthenticated = status === 'authenticated';

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Profile</h1>
      {isAuthenticated ? (
        <>
          <p>Email: {session.data.user?.email}</p>
          <Button
            className={styles.signIn}
            color='secondary'
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
};

export default Profile;
