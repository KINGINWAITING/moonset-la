/**
 * ChatLayout Component
 * Main layout wrapper for the chat interface
 * Provides layout structure and global keyboard shortcuts
 */

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useChat } from '@/contexts/ChatContext';
import { ConversationSidebar } from './ConversationSidebar';
import { ChatInterface } from './ChatInterface';

interface ChatLayoutProps {
  className?: string;
}

export const ChatLayout: React.FC<ChatLayoutProps> = ({ className }) => {
  const { uiState, updateUIState } = useChat();

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl/Cmd + B to toggle sidebar
      if ((event.ctrlKey || event.metaKey) && event.key === 'b') {
        event.preventDefault();
        updateUIState({ sidebarCollapsed: !uiState.sidebarCollapsed });
      }

      // Escape to close any open modals or menus
      if (event.key === 'Escape') {
        // Let individual components handle their own escape logic
        // This is just for global state cleanup if needed
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [uiState.sidebarCollapsed, updateUIState]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'h-full flex flex-col bg-background overflow-hidden',
        className
      )}
    >
      {/* Header */}
      <ChatHeader />
      
      {/* Main Content Grid - Fixed height container */}
      <div className={cn(
        'flex-1 grid transition-all duration-300 ease-out overflow-hidden',
        uiState.sidebarCollapsed
          ? 'grid-cols-[0px,1fr]'
          : 'grid-cols-[320px,1fr] lg:grid-cols-[380px,1fr]'
      )}>
        {/* Sidebar */}
        {!uiState.sidebarCollapsed && (
          <div className="w-80 flex-shrink-0 overflow-hidden">
            <ConversationSidebar />
          </div>
        )}
        
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <ChatInterface />
        </div>
      </div>

      {/* Sidebar Toggle for Mobile/Collapsed State */}
      {uiState.sidebarCollapsed && (
        <button
          onClick={() => updateUIState({ sidebarCollapsed: false })}
          className="fixed top-20 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg shadow-lg hover:bg-primary/90 transition-colors"
          aria-label="Open conversation sidebar"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </motion.div>
  );
};

const ChatHeader: React.FC = () => {
  const { uiState, updateUIState } = useChat();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="h-16 border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0 z-50"
    >
      <div className="h-full flex items-center justify-between px-6">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateUIState({ sidebarCollapsed: !uiState.sidebarCollapsed })}
            className="p-2 rounded-lg hover:bg-bg-secondary transition-colors"
            aria-label={uiState.sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
          >
            <svg
              className="w-5 h-5 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </motion.button>

          {/* Title */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ 
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                repeatDelay: 5
              }}
              className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.div>
            
            <div>
              <h1 className="text-lg font-semibold text-text-primary">
                MoonChat AI
              </h1>
              <p className="text-xs text-text-tertiary">
                Professional Crypto Trading Assistant
              </p>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-600 dark:text-green-400">
              Online
            </span>
          </div>

          {/* Settings Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => updateUIState({ isSettingsPanelOpen: !uiState.isSettingsPanelOpen })}
            className="p-2 rounded-lg hover:bg-bg-secondary transition-colors"
            aria-label="Settings"
          >
            <svg
              className="w-5 h-5 text-text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default ChatLayout; 