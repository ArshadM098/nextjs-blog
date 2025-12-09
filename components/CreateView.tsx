'use client';

import { ThoughtInput } from './ThoughtInput';
import { motion } from 'framer-motion';

interface CreateViewProps {
  onSubmit: (text: string) => void;
}

export function CreateView({ onSubmit }: CreateViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
    >
      <h2
        className="text-2xl font-bold mb-6"
        style={{ color: 'var(--color-foreground)' }}
      >
        Share Your Thought
      </h2>
      <ThoughtInput onSubmit={onSubmit} />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 p-6 rounded-xl"
        style={{
          backgroundColor: 'var(--color-muted)',
          border: '1px solid var(--color-border)',
        }}
      >
        <h3
          className="font-semibold mb-2"
          style={{ color: 'var(--color-foreground)' }}
        >
          💡 Tips for great shower thoughts:
        </h3>
        <ul
          className="space-y-2 text-sm"
          style={{ color: 'var(--color-mutedForeground)' }}
        >
          <li>• Keep it concise and thought-provoking</li>
          <li>• Question the ordinary</li>
          <li>• Be creative and original</li>
          <li>• Have fun with wordplay and perspectives</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
