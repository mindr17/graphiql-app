import { FC, PropsWithChildren } from 'react';

import { protectPageFrom } from '@/helpers/auth/protect-page-from';

const Layout: FC<PropsWithChildren> = async (props) => {
  const { children } = props;
  await protectPageFrom('unauthorized');

  return <>{children}</>;
};

export default Layout;
