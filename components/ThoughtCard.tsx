'use client';

import { ShowerThought } from '@/types/thought';
import { motion } from 'framer-motion';

interface ThoughtCardProps {
  thought: ShowerThought;
  onDelete: (id: string) => void;
}

export function ThoughtCard({ thought, onDelete }: ThoughtCardProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group relative p-6 rounded-2xl"
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <p
        className="text-lg leading-relaxed mb-3"
        style={{ color: 'var(--color-cardForeground)' }}
      >
        {thought.text}
      </p>
      <div className="flex items-center justify-between">
        <time
          className="text-sm"
          style={{ color: 'var(--color-mutedForeground)' }}
          dateTime={new Date(thought.createdAt).toISOString()}
        >
          {formatDate(thought.createdAt)}
        </time>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onDelete(thought.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded-lg text-sm font-medium"
          style={{
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-secondaryForeground)',
          }}
          aria-label="Delete thought"
        >
          Delete
        </motion.button>
      </div>
    </motion.div>
  );
}
