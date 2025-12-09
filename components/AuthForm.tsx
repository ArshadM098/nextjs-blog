'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AuthFormProps {
  mode: 'login' | 'signup';
  onSubmit: (data: AuthFormData) => Promise<boolean>;
  onToggleMode: () => void;
}

export interface AuthFormData {
  name?: string;
  email: string;
  password: string;
}

export function AuthForm({ mode, onSubmit, onToggleMode }: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await onSubmit(formData);
      if (!success) {
        setError(
          mode === 'login'
            ? 'Invalid email or password'
            : 'Email already exists'
        );
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md p-8 rounded-2xl"
      style={{
        backgroundColor: 'var(--color-card)',
        border: '1px solid var(--color-border)',
      }}
    >
      <h2
        className="text-3xl font-bold mb-6 text-center"
        style={{ color: 'var(--color-foreground)' }}
      >
        {mode === 'login' ? 'Welcome Back' : 'Join Us'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-2"
              style={{ color: 'var(--color-foreground)' }}
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-lg outline-none"
              style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
                border: '1px solid var(--color-border)',
              }}
              placeholder="John Doe"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-2"
            style={{ color: 'var(--color-foreground)' }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg outline-none"
            style={{
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-foreground)',
              border: '1px solid var(--color-border)',
            }}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-2"
            style={{ color: 'var(--color-foreground)' }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg outline-none"
            style={{
              backgroundColor: 'var(--color-background)',
              color: 'var(--color-foreground)',
              border: '1px solid var(--color-border)',
            }}
            placeholder="••••••••"
            minLength={6}
          />
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-500"
          >
            {error}
          </motion.p>
        )}

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full py-3 rounded-lg font-medium transition-opacity disabled:opacity-50"
          style={{
            backgroundColor: 'var(--color-primary)',
            color: 'var(--color-primaryForeground)',
          }}
        >
          {loading ? 'Please wait...' : mode === 'login' ? 'Sign In' : 'Create Account'}
        </motion.button>
      </form>

      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={onToggleMode}
          className="text-sm hover:underline"
          style={{ color: 'var(--color-mutedForeground)' }}
        >
          {mode === 'login'
            ? "Don't have an account? Sign up"
            : 'Already have an account? Sign in'}
        </button>
      </div>
    </motion.div>
  );
}
