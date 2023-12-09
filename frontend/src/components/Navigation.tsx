'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

type NavLink = {
  label: string;
  href: string;
};
type Props = {
  navLinks: NavLink[];
};

const Navigation = ({ navLinks }: Props) => {
  const pathname = usePathname();
  const session = useSession();

  return (
    <>
      {navLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            className={isActive ? 'active' : ''}
            href={link.href}
            key={link.label}
          >
            {link.label}
          </Link>
        );
      })}
      {session?.data && <Link href='/profile'>Profile</Link>}
      {session?.data ? (
        <Link href='#' onClick={() => signOut({ callbackUrl: '/' })}>
          Sign Out
        </Link>
      ) : (
        <Link href='/signin'>SignIn</Link>
      )}
    </>
  );
};

export { Navigation };
