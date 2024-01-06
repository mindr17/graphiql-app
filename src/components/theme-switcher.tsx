'use client';

import { Button } from '@nextui-org/button';
import { useTheme } from 'next-themes';
import { FC, useEffect, useState } from 'react';

const ThemeSwitcher: FC = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className='flex gap-4'>
      <Button
        size='sm'
        variant='flat'
        onClick={() => setTheme('light')}
      >
        Light
      </Button>
      <Button
        size='sm'
        variant='flat'
        onClick={() => setTheme('dark')}
      >
        Dark
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
