'use client';

import { useState } from 'react';
import { MAX_THOUGHT_LENGTH } from '@/types/thought';
import { motion } from 'framer-motion';

interface ThoughtInputProps {
  onSubmit: (text: string) => void;
}

export function ThoughtInput({ onSubmit }: ThoughtInputProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && text.length <= MAX_THOUGHT_LENGTH) {
      onSubmit(text.trim());
      setText('');
    }
  };

  const remaining = MAX_THOUGHT_LENGTH - text.length;
  const isOverLimit = remaining < 0;
  const isNearLimit = remaining <= 20 && remaining >= 0;

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div
        className="rounded-2xl p-6 space-y-4"
        style={{
          backgroundColor: 'var(--color-card)',
          border: '1px solid var(--color-border)',
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What shower thought just hit you? 🚿💭"
          className="w-full resize-none bg-transparent outline-none text-lg placeholder:opacity-50"
          style={{ color: 'var(--color-cardForeground)' }}
          rows={4}
          maxLength={MAX_THOUGHT_LENGTH + 50}
          aria-label="Enter your shower thought"
        />
        <div className="flex items-center justify-between">
          <motion.span
            animate={{
              color: isOverLimit
                ? '#EF4444'
                : isNearLimit
                ? '#F59E0B'
                : 'var(--color-mutedForeground)',
            }}
            className="text-sm font-medium"
          >
            {remaining} characters remaining
          </motion.span>
          <motion.button
            type="submit"
            disabled={!text.trim() || isOverLimit}
            whileHover={{ scale: text.trim() && !isOverLimit ? 1.05 : 1 }}
            whileTap={{ scale: text.trim() && !isOverLimit ? 0.95 : 1 }}
            className="px-6 py-2 rounded-full font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primaryForeground)',
            }}
          >
            Post Thought
          </motion.button>
        </div>
      </div>
    </form>
  );
}
