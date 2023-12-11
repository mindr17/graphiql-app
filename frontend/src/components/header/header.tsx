import Link from 'next/link';
import { FC } from 'react';

import Navigation from '@/components/Navigation';

import s from './header.module.css';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const Header: FC = () => {
  return (
    <header className={s.container}>
      <Navigation navLinks={navItems} />
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-2'>
          <li>
            <Link href='/client-profile'>Client Profile</Link>
          </li>
          <li>
            <Link href='/backend-profile'>Backend Profile</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
