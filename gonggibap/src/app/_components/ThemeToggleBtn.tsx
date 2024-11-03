'use client';


import { useEffect, useState } from 'react';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { MobilePosition } from '@/types/sidebar';

import { useMediaQuery } from '@/hooks/useMediaQuery';





interface ThemeToggleBtnProps {
  position?: MobilePosition;
}

export function ThemeToggleBtn({ position }: ThemeToggleBtnProps) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className={`
        z-10 size-12 rounded-full bg-white shadow-lg flex-center 
        hover:bg-gray-100 focus:outline-none dark:bg-gray-800 dark:hover:bg-gray-700
        ${isMobile ? 'absolute -top-16 right-4' : 'fixed bottom-20 right-4'}
        ${position === 'full' ? '!hidden' : ''}
      `}>
      {theme === 'dark' ? (
        <Moon color="#B3B3B3" size="1.5rem" />
      ) : (
        <Sun color="#B3B3B3" size="1.5rem" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
