'use client';

import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { FC } from 'react';

const Profile: FC = () => {
  const session = useSession();
  const { status } = session;
  const isAuthenticated = status === 'authenticated';

  return (
    <div>
      <h1>Client profile</h1>
      {isAuthenticated ? (
        <div>
          <p>User: {session.data.user?.name}</p>
          <p>Email: {session.data.user?.email}</p>
          <p>
            {/* <Image
              alt={`Image by ${session.data.user?.name}`}
              src={session.data.user?.image as string}
              height={35}
              width={35}
            /> */}
          </p>
          <br />
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
