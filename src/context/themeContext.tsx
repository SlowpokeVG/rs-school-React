import { createContext, ReactNode, useState } from 'react';

type Theme = 'light' | 'dark';

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>('dark');

  const toggleTheme = () => {
    if (theme == 'light') setTheme('dark');
    else setTheme('light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
