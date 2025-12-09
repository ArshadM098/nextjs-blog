'use client';

import { useTheme } from '@/lib/theme-context';
import { Theme } from '@/types/theme';
import { motion } from 'framer-motion';

const themeLabels: Record<Theme, { name: string; icon: string }> = {
  light: { name: 'Light', icon: '☀️' },
  dark: { name: 'Dark', icon: '🌙' },
  sunset: { name: 'Sunset', icon: '🌅' },
  midnight: { name: 'Midnight', icon: '🌌' },
};

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {(Object.keys(themeLabels) as Theme[]).map((themeKey) => {
        const isActive = theme === themeKey;
        const { name, icon } = themeLabels[themeKey];

        return (
          <motion.button
            key={themeKey}
            onClick={() => setTheme(themeKey)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              backgroundColor: isActive ? 'var(--color-primary)' : 'var(--color-card)',
              color: isActive ? 'var(--color-primaryForeground)' : 'var(--color-cardForeground)',
            }}
            aria-label={`Switch to ${name} theme`}
            aria-pressed={isActive}
          >
            <span className="flex items-center gap-2">
              <span>{icon}</span>
              <span>{name}</span>
            </span>
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: 'var(--color-primary)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
