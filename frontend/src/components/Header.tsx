import { Navigation } from './Navigation';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

const TheHeader: React.FC = () => {
  return (
    <header>
      <Navigation navLinks={navItems} />
    </header>
  );
};

export { TheHeader };
