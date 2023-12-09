import Image from 'next/image';
import { getServerSession } from 'next-auth/next';

import { googleAuthConfig } from '../../../configs/auth';

export default async function Profile() {
  const session = await getServerSession(googleAuthConfig);

  return (
    <div>
      <h1>Profile of {session?.user?.name}</h1>
      {session?.user?.image && (
        <Image alt='' src={session.user.image} />
      )}
    </div>
  );
}
