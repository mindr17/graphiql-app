'use client';

import { FC, useContext } from 'react';

import Navigation from '@/components/navigation/navigation';
import { AppContext } from '@/context/context';

import s from './header.module.css';

const Header: FC = () => {
  const context = useContext(AppContext);
  const { signIn } = context;

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
    { label: 'Sign In', href: '/sign-in' },
    { label: 'Sign Up', href: '/sign-up' },
    { label: 'Frontend Profile', href: '/client-profile' },
    { label: 'Backend Profile', href: '/backend-profile' },
  ];

  return (
    <header className={s.container}>
      <Navigation navLinks={navItems} />
    </header>
  );
};

export default Header;
