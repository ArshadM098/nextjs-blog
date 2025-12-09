'use client';

import { useAuth } from '@/lib/auth-context';
import { LandingPage } from '@/components/LandingPage';
import { AppLayout } from '@/components/AppLayout';

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LandingPage />;
  }

  return <AppLayout />;
}
