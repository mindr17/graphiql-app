'use client';

import { Button } from '@nextui-org/button';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/dropdown';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useContext } from 'react';

import BurgerSvg from '@/components/svg-icons/burger';
import { AppContext } from '@/context/context';

import { navItems } from '../header-nav/header-nav';
import styles from './header-mob-menu.module.css';

const HeaderMobMenu = () => {
  const session = useSession();
  const router = useRouter();

  const context = useContext(AppContext);
  const { translations } = context;
  const { signIn, signUp } = translations;

  const handleClickLink = (link: string) => {
    router.push(link);
  };

  return (
    <Dropdown placement='bottom-end'>
      <DropdownTrigger>
        <Button variant='faded' className={styles.svgTeam} isIconOnly>
          <BurgerSvg />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label='Navigation'>
        <DropdownSection showDivider>
          {navItems.map((item) => {
            return (
              <DropdownItem
                key={item.label}
                onClick={() => handleClickLink(item.href)}
              >
                {item.label}
              </DropdownItem>
            );
          })}
        </DropdownSection>

        {session?.data ? (
          <DropdownSection>
            <DropdownItem
              key={'signOut'}
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              {'Sign Out'}
            </DropdownItem>
          </DropdownSection>
        ) : (
          <DropdownSection>
            <DropdownItem
              key={'signIn'}
              onClick={() => handleClickLink('/signIn')}
            >
              {signIn}
            </DropdownItem>
            <DropdownItem
              key={'signUp'}
              onClick={() => handleClickLink('/signup')}
            >
              {signUp}
            </DropdownItem>
          </DropdownSection>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default HeaderMobMenu;
