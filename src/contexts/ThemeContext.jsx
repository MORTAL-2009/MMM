import React, { createContext, useContext, useEffect, useState } from 'react';

export const THEMES = [
  { id: 'atelier-nuptials', name: 'Atelier Nuptials (Stitch)', description: 'Stitch Luxury Ivory & Royal Emerald', primaryColor: '#0D221A', bgBase: '#F7F2E8' },
  { id: 'gold-noir', name: 'Gold Noir', description: 'Black & Antique Gold (Default)', primaryColor: '#D4AF37', bgBase: '#0B0C10' },
  { id: 'emerald-velvet', name: 'Emerald Velvet', description: 'Deep Emerald & Gold Accents', primaryColor: '#10B981', bgBase: '#06140D' },
  { id: 'sapphire-lounge', name: 'Sapphire Lounge', description: 'Midnight Blue & Royal Gold', primaryColor: '#3B82F6', bgBase: '#070B19' },
  { id: 'champagne-pearl', name: 'Champagne Pearl', description: 'Ivory, Warm Champagne & Pearl', primaryColor: '#F59E0B', bgBase: '#1C1917' },
];

const ThemeContext = createContext({
  theme: 'gold-noir',
  setTheme: () => {},
  themes: THEMES,
});

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem('mmm-theme');
    return saved || import.meta.env.VITE_DEFAULT_THEME || 'gold-noir';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('mmm-theme', theme);
  }, [theme]);

  const setTheme = (newTheme) => {
    if (THEMES.some((t) => t.id === newTheme)) {
      setThemeState(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
