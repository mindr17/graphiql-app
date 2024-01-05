import { FC, PropsWithChildren } from 'react';

import { protectFromAuthorized } from '@/helpers/auth/protect-from-authorized';

const Layout: FC<PropsWithChildren> = async (props) => {
  const { children } = props;
  await protectFromAuthorized();

  return <>{children}</>;
};

export default Layout;
