'use client';

import { motion } from 'framer-motion';

export type Tab = 'feed' | 'create';

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { value: Tab; label: string; icon: string }[] = [
  { value: 'feed', label: 'Feed', icon: '📰' },
  { value: 'create', label: 'Create', icon: '✍️' },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div
      className="flex gap-2 p-2 rounded-full"
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      {tabs.map((tab) => (
        <motion.button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          whileTap={{ scale: 0.95 }}
          className="relative flex-1 px-6 py-3 rounded-full font-medium transition-all"
          style={{
            color:
              activeTab === tab.value
                ? 'var(--color-primaryForeground)'
                : 'var(--color-mutedForeground)',
          }}
        >
          {activeTab === tab.value && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: 'var(--color-primary)' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center justify-center gap-2">
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </span>
        </motion.button>
      ))}
    </div>
  );
}
