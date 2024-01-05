'use client';

import { Navbar, NavbarBrand } from '@nextui-org/react';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import LanguageSelect from '@/components/header/language-select/language-select';

import styles from './header.module.scss';
import HeaderMobMenu from './header-mob-menu/header-mob-menu';
import HeaderNav from './header-nav/header-nav';
import HeaderUser from './header-user/header-user';

const Header = () => {
  const [headerActive, setHeaderActive] = useState<boolean>(false);

  useEffect(() => {
    const listenScrollEvent = () => {
      setHeaderActive(document.body.scrollTop > 0);
    };

    document.body.addEventListener('scroll', listenScrollEvent);

    return () => {
      document.body.removeEventListener('scroll', listenScrollEvent);
    };
  }, []);

  return (
    <Navbar
      data-testid='header'
      maxWidth='full'
      className={clsx(styles.header, {
        [styles.headerActive]: headerActive,
      })}
    >
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
