import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './header-nav.module.scss';

export const navItems = [
  // { label: 'Home', href: '/' },
  // { label: signIn, href: '/sign-in' },
  // { label: signUp, href: '/sign-up' },
  // { label: 'Frontend Profile', href: '/client-profile' },
  // { label: 'Backend Profile', href: '/backend-profile' },
  { label: 'Explorer', href: '/explorer' },
];

const HeaderNav = () => {
  const pathname = usePathname();

  return (
    <>
      {navItems.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            className={clsx(styles.item, {
              [styles.active]: isActive,
            })}
            href={link.href}
            key={link.label}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
};

export default HeaderNav;
