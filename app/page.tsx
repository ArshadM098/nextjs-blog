'use client';

import { useState } from 'react';
import { ThemeSelector } from '@/components/ThemeSelector';
import { ThoughtInput } from '@/components/ThoughtInput';
import { ThoughtsList } from '@/components/ThoughtsList';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ShowerThought } from '@/types/thought';
import { motion } from 'framer-motion';

export default function Home() {
  const [thoughts, setThoughts, mounted] = useLocalStorage<ShowerThought[]>('shower-thoughts', []);

  const addThought = (text: string) => {
    const newThought: ShowerThought = {
      id: Date.now().toString(),
      text,
      createdAt: new Date(),
    };
    setThoughts([newThought, ...thoughts]);
  };

  const deleteThought = (id: string) => {
    setThoughts(thoughts.filter((thought) => thought.id !== id));
  };

  if (!mounted) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-background)' }}>
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h1
            className="text-5xl md:text-6xl font-bold mb-3 tracking-tight"
            style={{ color: 'var(--color-foreground)' }}
          >
            Shower Thoughts
          </h1>
          <p
            className="text-lg md:text-xl mb-8"
            style={{ color: 'var(--color-mutedForeground)' }}
          >
            Random musings from the shower 🚿
          </p>
          <ThemeSelector />
        </motion.header>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-12"
        >
          <ThoughtInput onSubmit={addThought} />
        </motion.div>

        {/* Thoughts List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ThoughtsList thoughts={thoughts} onDelete={deleteThought} />
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-16 pb-8"
        >
          <p className="text-sm" style={{ color: 'var(--color-mutedForeground)' }}>
            Built with Next.js 15 • Mobile First • Beautiful Themes
          </p>
        </motion.footer>
      </main>
    </div>
  );
}
