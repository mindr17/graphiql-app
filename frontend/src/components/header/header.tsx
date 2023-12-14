import { FC } from 'react';

import Navigation from '@/components/navigation/navigation';

import s from './header.module.css';

const Header: FC = () => {
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'About', href: '/about' },
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
