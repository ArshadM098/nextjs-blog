'use client';

import { useTheme } from '@/lib/theme-context';
import { Theme } from '@/types/theme';
import { motion } from 'framer-motion';
import { Sun, Moon, Sunset, Sparkles } from 'lucide-react';

const themeLabels: Record<Theme, { name: string; icon: React.ComponentType<{ className?: string }> }> = {
  light: { name: 'Light', icon: Sun },
  dark: { name: 'Dark', icon: Moon },
  sunset: { name: 'Sunset', icon: Sunset },
  midnight: { name: 'Midnight', icon: Sparkles },
};

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      {(Object.keys(themeLabels) as Theme[]).map((themeKey) => {
        const isActive = theme === themeKey;
        const { name, icon: Icon } = themeLabels[themeKey];

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
            <span className="flex items-center gap-2 relative z-10">
              <Icon className="w-4 h-4" />
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
