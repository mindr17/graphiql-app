import Link from 'next/link';

import { Navigation } from '../Navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const TheHeader: React.FC = () => {
  return (
    <header className='py-6'>
      <Navigation navLinks={navItems} />
      <nav className='container flex items-center justify-between'>
        <ul className='flex gap-2'>
          <li>
            <Link href='/'>Home</Link>
          </li>
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

export { TheHeader };
