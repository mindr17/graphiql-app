'use client';

import Image from 'next/image';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';

const ClientProfile: React.FC = () => {
  const session = useSession();

  return (
    <div>
      <h1>Client profile</h1>
      {session.status === 'authenticated' && (
        <>
          <p>User: {session.data.user?.name}</p>
          <p>Email: {session.data.user?.email}</p>
          <p>
            Logo:{' '}
            <Image
              alt={`Image by ${session.data.user?.name}`}
              height={35}
              src={session.data.user?.image as string}
              width={35}
            />
          </p>
          <Link href='#' onClick={() => signOut()}>
            Signout
          </Link>
        </>
      )}

      {session.status === 'unauthenticated' && (
        <Link href='/api/auth/signin'>SignIn</Link>
      )}
    </div>
  );
};

export default ClientProfile;
