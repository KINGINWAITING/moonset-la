/**
 * ChatInterface Component
 * Main chat area containing message list and input
 * Features a clean, professional design without cards or heavy styling
 */

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useChat } from '@/contexts/ChatContext';
import { MessageList } from '../messages/MessageList';
import { ChatInput } from '../input/ChatInput';
import { 
  MessageSquare, 
  Sparkles,
  TrendingUp,
  BarChart3
} from 'lucide-react';

export const ChatInterface: React.FC = () => {
  const { currentConversation } = useChat();

  if (!currentConversation) {
    return <EmptyState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="h-full flex flex-col bg-background overflow-hidden"
    >
      {/* Chat Header */}
      <ChatHeader />
      
      {/* Messages Area - Fixed height container with internal scroll */}
      <div className="flex-1 overflow-hidden">
        <MessageList className="h-full" />
      </div>
      
      {/* Input Area - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-border">
        <ChatInput />
      </div>
    </motion.div>
  );
};

const ChatHeader: React.FC = () => {
  const { currentConversation } = useChat();
  
  if (!currentConversation) return null;

  const messageCount = currentConversation.messages.length - 1; // Exclude welcome message
  const lastMessage = currentConversation.messages[currentConversation.messages.length - 1];

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="border-b border-border bg-background/80 backdrop-blur-sm flex-shrink-0 z-10"
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Conversation Info */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            
            <div>
              <h2 className="text-lg font-semibold text-text-primary truncate max-w-md">
                {currentConversation.title}
              </h2>
              <p className="text-sm text-text-secondary">
                {messageCount} message{messageCount !== 1 ? 's' : ''} • Updated {formatLastUpdate(currentConversation.updatedAt)}
              </p>
            </div>
          </div>

          {/* Right: Chat Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>AI Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>Market Data</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Real-time</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const EmptyState: React.FC = () => {
  const { createConversation } = useChat();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full flex items-center justify-center bg-background overflow-auto"
    >
      <div className="text-center max-w-md mx-auto px-6 py-8">
        {/* Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              repeatDelay: 3
            }}
          >
            <MessageSquare className="w-10 h-10 text-primary" />
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-2xl font-semibold text-text-primary mb-3">
            Welcome to MoonChat AI
          </h2>
          <p className="text-text-secondary mb-6 leading-relaxed">
            Your advanced crypto trading assistant is ready to help you with market analysis, 
            trading strategies, DeFi insights, and MOONSET token information.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 gap-4 mb-8"
        >
          {[
            {
              icon: TrendingUp,
              title: 'Market Analysis',
              description: 'Real-time crypto market insights and trends'
            },
            {
              icon: BarChart3,
              title: 'Trading Strategies',
              description: 'Professional trading advice and recommendations'
            },
            {
              icon: Sparkles,
              title: 'DeFi Insights',
              description: 'Advanced analysis of DeFi protocols and opportunities'
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="flex items-start gap-3 text-left p-4 rounded-xl border border-border hover:bg-bg-secondary/50 transition-colors"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <feature.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-text-primary mb-1">{feature.title}</h3>
                <p className="text-sm text-text-secondary">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <button
            onClick={() => createConversation()}
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <MessageSquare className="w-5 h-5" />
            Start Conversation
          </button>
          
          <p className="text-xs text-text-tertiary mt-4">
            Or use the sidebar to start a new conversation
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

// Utility function
const formatLastUpdate = (date: Date): string => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
};

export default ChatInterface; 