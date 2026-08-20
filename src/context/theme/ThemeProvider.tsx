import type { PropsWithChildren } from 'react';
import React, { useEffect } from 'react';

import { type Theme, ThemeContext } from '@/context/theme/ThemeContext';

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = React.useState<Theme>(() => {
    const localStorageTheme = localStorage.getItem('theme') as Theme | null;

    if (localStorageTheme) {
      return localStorageTheme;
    }
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };
  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}
