import Navigation from '@/components/navigation/navigation';

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

export default TheHeader;
