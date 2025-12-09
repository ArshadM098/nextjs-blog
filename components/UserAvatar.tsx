'use client';

import { motion } from 'framer-motion';

interface UserAvatarProps {
  initials: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const sizes = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-12 h-12 text-lg',
};

export function UserAvatar({ initials, size = 'md', onClick }: UserAvatarProps) {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      onClick={onClick}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      className={`${sizes[size]} rounded-full flex items-center justify-center font-bold`}
      style={{
        backgroundColor: 'var(--color-primary)',
        color: 'var(--color-primaryForeground)',
      }}
      aria-label={onClick ? 'Open menu' : 'User avatar'}
    >
      {initials}
    </Component>
  );
}
