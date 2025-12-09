'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { UserAvatar } from './UserAvatar';
import { Sidebar } from './Sidebar';
import { TabNavigation, Tab } from './TabNavigation';
import { FeedView } from './FeedView';
import { CreateView } from './CreateView';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { ShowerThought } from '@/types/thought';
import { AnimatePresence } from 'framer-motion';

export function AppLayout() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('feed');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [thoughts, setThoughts, mounted] = useLocalStorage<ShowerThought[]>(
    'shower-thoughts',
    []
  );

  const addThought = (text: string) => {
    const newThought: ShowerThought = {
      id: Date.now().toString(),
      text,
      createdAt: new Date(),
    };
    setThoughts([newThought, ...thoughts]);
    setActiveTab('feed'); // Switch to feed after posting
  };

  const deleteThought = (id: string) => {
    setThoughts(thoughts.filter((thought) => thought.id !== id));
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Header */}
      <header
        className="sticky top-0 z-30 px-4 py-4 backdrop-blur-lg"
        style={{
          backgroundColor: 'var(--color-background)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container mx-auto max-w-3xl flex items-center justify-between">
          <UserAvatar
            initials={user?.initials || 'U'}
            size="md"
            onClick={() => setSidebarOpen(true)}
          />
          <h1
            className="text-xl font-bold"
            style={{ color: 'var(--color-foreground)' }}
          >
            Shower Thoughts
          </h1>
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 max-w-3xl">
        {/* Tab Navigation */}
        <div className="mb-8">
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'feed' ? (
            <FeedView
              key="feed"
              thoughts={thoughts}
              onDelete={deleteThought}
            />
          ) : (
            <CreateView key="create" onSubmit={addThought} />
          )}
        </AnimatePresence>
      </main>

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </div>
  );
}
