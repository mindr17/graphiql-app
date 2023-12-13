import { FC } from 'react';

import Navigation from '@/components/navigation/navigation';
import { HeaderDocument } from '@/graphql/private/gql/graphql';
import { privateClient } from '@/helpers/graphql-clients';

import s from './header.module.css';

const Header: FC = async () => {
  const headerData = await privateClient.request(HeaderDocument);
  const globalTranslation = headerData.global?.translations?.[0];
  const signInLabel = globalTranslation?.signin_label || '';

  const navItems = [
    { label: signInLabel, href: '/about' },
    { label: 'client profile', href: '/client-profile' },
    { label: 'backend profile', href: '/backend-profile' },
  ];

  return (
    <header className={s.container}>
      <Navigation navLinks={navItems} />
    </header>
  );
};

export default Header;
