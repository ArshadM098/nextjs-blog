'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { AuthForm, AuthFormData } from './AuthForm';
import { motion } from 'framer-motion';

export function LandingPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const { login, signup } = useAuth();

  const handleSubmit = async (data: AuthFormData): Promise<boolean> => {
    if (mode === 'login') {
      return await login(data.email, data.password);
    } else {
      return await signup(data.name || '', data.email, data.password);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1
          className="text-6xl md:text-7xl font-bold mb-4"
          style={{ color: 'var(--color-foreground)' }}
        >
          Shower Thoughts
        </h1>
        <p
          className="text-xl md:text-2xl"
          style={{ color: 'var(--color-mutedForeground)' }}
        >
          Random musings from the shower 🚿
        </p>
      </motion.div>

      <AuthForm
        mode={mode}
        onSubmit={handleSubmit}
        onToggleMode={() => setMode(mode === 'login' ? 'signup' : 'login')}
      />
    </div>
  );
}
