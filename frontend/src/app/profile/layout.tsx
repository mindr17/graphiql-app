import { FC, PropsWithChildren } from 'react';

import { protectFromUnauthorized } from '@/helpers/auth/protect-from-unauthorized';

const Layout: FC<PropsWithChildren> = async (props) => {
  const { children } = props;
  await protectFromUnauthorized();

  return <>{children}</>;
};

export default Layout;
