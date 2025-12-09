'use client';

import { useAuth } from '@/lib/auth-context';
import { useTheme } from '@/lib/theme-context';
import { Theme } from '@/types/theme';
import { motion, AnimatePresence } from 'framer-motion';
import { UserAvatar } from './UserAvatar';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const themeOptions: { value: Theme; label: string; icon: string }[] = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'sunset', label: 'Sunset', icon: '🌅' },
  { value: 'midnight', label: 'Midnight', icon: '🌌' },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-80 z-50 p-6 shadow-xl"
            style={{
              backgroundColor: 'var(--color-card)',
              borderRight: '1px solid var(--color-border)',
            }}
          >
            {/* User Info */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <UserAvatar initials={user?.initials || 'U'} size="lg" />
                <div>
                  <h3
                    className="font-semibold text-lg"
                    style={{ color: 'var(--color-foreground)' }}
                  >
                    {user?.name}
                  </h3>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--color-mutedForeground)' }}
                  >
                    {user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Theme Selector */}
            <div className="mb-8">
              <h4
                className="text-sm font-semibold mb-3 uppercase tracking-wide"
                style={{ color: 'var(--color-mutedForeground)' }}
              >
                Theme
              </h4>
              <div className="space-y-2">
                {themeOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setTheme(option.value)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                    style={{
                      backgroundColor:
                        theme === option.value
                          ? 'var(--color-primary)'
                          : 'var(--color-secondary)',
                      color:
                        theme === option.value
                          ? 'var(--color-primaryForeground)'
                          : 'var(--color-secondaryForeground)',
                    }}
                  >
                    <span className="text-xl">{option.icon}</span>
                    <span className="font-medium">{option.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-3 rounded-lg font-medium"
              style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-secondaryForeground)',
              }}
            >
              Sign Out
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
