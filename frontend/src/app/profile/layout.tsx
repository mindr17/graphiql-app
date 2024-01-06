import { FC, PropsWithChildren } from 'react';

import { protectPageFrom } from '@/helpers/auth/protect-page-from';

const Layout: FC<PropsWithChildren> = async (props) => {
  const { children } = props;
  await protectPageFrom('authorized');

  return <>{children}</>;
};

export default Layout;
