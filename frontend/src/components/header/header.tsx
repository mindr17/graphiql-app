'use client';

import { FC, useContext } from 'react';

import Navigation from '@/components/navigation/navigation';
import { AppContext } from '@/context/context';

import s from './header.module.css';

const Header: FC = () => {
  // const headerData = await privateClient.request(HeaderDocument);
  // const globalTranslation = headerData.global?.translations?.[0];
  // const signInLabel = globalTranslation?.signin_label || '';
  const context = useContext(AppContext);
  const { translations } = context;
  const { signIn } = translations;
  console.log('signIn: ', signIn);
  context.setLocale('ru');

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: context.translations?.signIn, href: '/sign-in' },
    { label: 'Sign Up', href: '/sign-up' },
    { label: 'Frontend Profile', href: '/client-profile' },
    { label: 'Backend Profile', href: '/backend-profile' },
    { label: 'Explorer', href: '/explorer' },
  ];

  return (
    <header className={s.container}>
      <Navigation navLinks={navItems} />
    </header>
  );
};

export default Header;
