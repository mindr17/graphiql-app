import Image from 'next/image';
import { getServerSession } from 'next-auth/next';
import { FC } from 'react';

import { googleAuthConfig } from '../../../configs/auth';

const BackendProfile: FC = async () => {
  const session = await getServerSession(googleAuthConfig);

  return (
    <div>
      <h1>Profile of {session?.user?.name}</h1>
      {session?.user?.image && (
        <Image
          alt=''
          src={session.user.image}
          width={35}
          height={35}
        />
      )}
    </div>
  );
};

export default BackendProfile;
