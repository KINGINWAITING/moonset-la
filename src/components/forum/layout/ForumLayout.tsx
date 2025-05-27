import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface ForumLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  rightPanel?: React.ReactNode;
  header?: React.ReactNode;
}

export const ForumLayout = ({ children, sidebar, rightPanel, header }: ForumLayoutProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      {/* Forum Header */}
      {header && (
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          {header}
        </div>
      )}

      {/* Main Forum Layout */}
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-12 gap-6 p-6">
          {/* Left Sidebar - Categories */}
          {sidebar && (
            <aside className="col-span-12 lg:col-span-3 xl:col-span-2">
              <div className="sticky top-24">
                {sidebar}
              </div>
            </aside>
          )}

          {/* Main Content Area */}
          <main className={`col-span-12 ${sidebar ? 'lg:col-span-6 xl:col-span-7' : 'lg:col-span-9'} ${rightPanel ? 'lg:col-span-6 xl:col-span-7' : ''}`}>
            {children}
          </main>

          {/* Right Sidebar - Activity */}
          {rightPanel && (
            <aside className="col-span-12 lg:col-span-3 xl:col-span-3">
              <div className="sticky top-24">
                {rightPanel}
              </div>
            </aside>
          )}
        </div>
      </div>
    </motion.div>
  );
}; 