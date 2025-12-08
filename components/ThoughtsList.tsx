'use client';

import { ShowerThought } from '@/types/thought';
import { ThoughtCard } from './ThoughtCard';
import { AnimatePresence, motion } from 'framer-motion';

interface ThoughtsListProps {
  thoughts: ShowerThought[];
  onDelete: (id: string) => void;
}

export function ThoughtsList({ thoughts, onDelete }: ThoughtsListProps) {
  if (thoughts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <p className="text-xl mb-2" style={{ color: 'var(--color-mutedForeground)' }}>
          No thoughts yet
        </p>
        <p className="text-sm" style={{ color: 'var(--color-mutedForeground)' }}>
          Share your first shower thought above!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {thoughts.map((thought) => (
          <ThoughtCard key={thought.id} thought={thought} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </div>
  );
}
