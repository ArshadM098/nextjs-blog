'use client';

import { ShowerThought } from '@/types/thought';
import { ThoughtsList } from './ThoughtsList';
import { motion } from 'framer-motion';

interface FeedViewProps {
  thoughts: ShowerThought[];
  onDelete: (id: string) => void;
}

export function FeedView({ thoughts, onDelete }: FeedViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.2 }}
    >
      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: 'var(--color-foreground)' }}
      >
        Recent Thoughts
      </h2>
      <ThoughtsList thoughts={thoughts} onDelete={onDelete} />
    </motion.div>
  );
}
