'use client';

import { Navbar, NavbarBrand } from '@nextui-org/react';
import Link from 'next/link';

import LanguageSelect from '@/components/header/language-select/language-select';

import styles from './header.module.scss';
import HeaderMobMenu from './header-mob-menu/header-mob-menu';
import HeaderNav from './header-nav/header-nav';
import HeaderUser from './header-user/header-user';

const Header = () => {
  return (
    <Navbar className={styles.header}>
      <NavbarBrand>
        <Link href='/' className={styles.title}>
          Api
        </Link>
        <LanguageSelect />
      </NavbarBrand>
      <div className={styles.wrapper}>
        <HeaderNav />
        <HeaderUser />
      </div>
      <div className={styles.wrapperMob}>
        <HeaderMobMenu />
      </div>
    </Navbar>
  );
};

export default Header;
