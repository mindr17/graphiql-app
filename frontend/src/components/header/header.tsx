'use client';

import { FC, useContext } from 'react';

import LanguageSelect from '@/components/header/language-select/language-select';
import Navigation from '@/components/navigation/navigation';
import { AppContext, Context } from '@/context/context';

import s from './header.module.css';

const Header: FC = () => {
  // const headerData = await privateClient.request(HeaderDocument);
  // const globalTranslation = headerData.global?.translations?.[0];
  // const signInLabel = globalTranslation?.signin_label || '';
  const context = useContext<Context>(AppContext);
  const { translations } = context;
  const { signIn, signUp } = translations;

  const navItems = [
    { label: 'Home', href: '/' },
    { label: signIn, href: '/sign-in' },
    { label: signUp, href: '/sign-up' },
    { label: 'Frontend Profile', href: '/client-profile' },
    { label: 'Backend Profile', href: '/backend-profile' },
    { label: 'Explorer', href: '/explorer' },
  ];

  return (
    <header className={s.container}>
      <div className={s.wrapper}>
        <LanguageSelect />
        <Navigation navLinks={navItems} />
      </div>
    </header>
  );
};

export default Header;
