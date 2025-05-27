import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';

interface IDOLayoutProps {
  children: React.ReactNode;
  sidebar?: React.ReactNode;
  rightPanel?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const IDOLayout = ({ children, sidebar, rightPanel, header, footer }: IDOLayoutProps) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen h-full bg-background flex flex-col ido-layout"
      style={{ minHeight: '100vh' }}
    >
      {/* IDO Header */}
      {header && (
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border flex-shrink-0">
          {header}
        </div>
      )}

      {/* Main IDO Layout - Flex container for content */}
      <div className="flex-1 flex flex-col bg-background">
        <div className="max-w-[1600px] mx-auto w-full flex-1 flex flex-col bg-background">
          <div className="grid grid-cols-12 gap-6 p-6 flex-1 ido-grid bg-background">
            {/* Left Sidebar - IDO Progress & Navigation */}
            {sidebar && (
              <aside className="col-span-12 lg:col-span-2 xl:col-span-2">
                <div className="ido-sticky ido-sidebar">
                  {sidebar}
                </div>
              </aside>
            )}

            {/* Main Content Area - IDO Steps & Information */}
            <main className={`col-span-12 ${sidebar ? 'lg:col-span-8 xl:col-span-8' : 'lg:col-span-10'} ${rightPanel ? 'lg:col-span-7 xl:col-span-8' : ''} flex flex-col ido-content`}>
              <div className="flex-1">
                {children}
              </div>
            </main>

            {/* Right Sidebar - Token Stats & Activity */}
            {rightPanel && (
              <aside className="col-span-12 lg:col-span-3 xl:col-span-2">
                <div className="ido-sticky ido-sidebar">
                  {rightPanel}
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>

      {/* Footer - Always at bottom */}
      {footer && (
        <div className="flex-shrink-0 mt-auto bg-background">
          {footer}
        </div>
      )}
    </motion.div>
  );
}; 