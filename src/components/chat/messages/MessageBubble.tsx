/**
 * MessageBubble Component
 * Individual message display with clean, minimalistic design
 * Features subtle styling, hover actions, and professional appearance
 */

import React, { useState, useCallback, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Message } from '@/types/chat';
import { useChat } from '@/contexts/ChatContext';
import { MessageActions } from './MessageActions';
import { 
  User, 
  Bot, 
  TrendingUp, 
  BarChart3, 
  Code,
  AlertCircle,
  Clock
} from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
  isFirst?: boolean;
  isLast?: boolean;
  showTimestamp?: boolean;
  messageSpacing?: 'compact' | 'comfortable' | 'spacious';
}

export const MessageBubble = forwardRef<HTMLDivElement, MessageBubbleProps>(({
  message,
  isFirst = false,
  isLast = false,
  showTimestamp = true,
  messageSpacing = 'comfortable'
}, ref) => {
  const { settings } = useChat();
  const [isHovered, setIsHovered] = useState(false);
  const isUser = message.role === 'user';
  const isLoading = message.isLoading;

  // Spacing classes based on settings
  const spacingClasses = {
    compact: 'mb-3',
    comfortable: 'mb-6',
    spacious: 'mb-8'
  };

  // Get appropriate icon for message type
  const getMessageIcon = () => {
    if (isUser) return <User className="w-4 h-4" />;
    
    switch (message.type) {
      case 'analysis':
        return <TrendingUp className="w-4 h-4" />;
      case 'chart':
        return <BarChart3 className="w-4 h-4" />;
      case 'code':
        return <Code className="w-4 h-4" />;
      case 'error':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  // Get message type badge color
  const getTypeBadgeColor = () => {
    switch (message.type) {
      case 'analysis':
        return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'chart':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'code':
        return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'error':
        return 'bg-red-500/10 text-red-600 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
    
    return date.toLocaleDateString([], { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 40,
        opacity: { duration: 0.2 }
      }}
      className={cn(
        'group relative',
        spacingClasses[messageSpacing],
        isFirst && 'mt-0',
        isLast && 'mb-2'
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={cn(
        'flex gap-4',
        isUser ? 'justify-end' : 'justify-start'
      )}>
        {/* Avatar - only for assistant messages */}
        {!isUser && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mt-1"
          >
            {getMessageIcon()}
          </motion.div>
        )}

        {/* Message Content */}
        <div className={cn(
          'flex-1 max-w-[85%] md:max-w-[75%]',
          isUser && 'flex justify-end'
        )}>
          <motion.div
            layout
            className={cn(
              'relative group',
              isUser && 'flex flex-col items-end'
            )}
          >
            {/* Message Header */}
            <div className={cn(
              'flex items-center gap-2 mb-1',
              isUser ? 'justify-end' : 'justify-start'
            )}>
              <span className="text-xs font-medium text-text-secondary">
                {isUser ? 'You' : 'MoonChat AI'}
              </span>
              
              {/* Message Type Badge */}
              {message.type && message.type !== 'text' && (
                <div className={cn(
                  'px-2 py-0.5 rounded-full text-xs font-medium border',
                  getTypeBadgeColor()
                )}>
                  {message.type}
                </div>
              )}

              {/* Timestamp */}
              {showTimestamp && (
                <span className="text-xs text-text-tertiary">
                  {formatTimestamp(message.timestamp)}
                </span>
              )}
            </div>

            {/* Message Bubble */}
            <motion.div
              layout
              whileHover={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className={cn(
                'relative px-4 py-3 rounded-2xl text-sm leading-relaxed',
                'transition-all duration-200',
                isUser 
                  ? 'bg-primary text-primary-foreground ml-8'
                  : 'bg-bg-secondary border border-border mr-8',
                isLoading && 'animate-pulse'
              )}
            >
              {/* Loading State */}
              {isLoading ? (
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="relative"
                  >
                    {/* Smooth silver gradient glow */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400/20 via-gray-300/30 to-gray-400/20 blur-md"
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity, 
                        ease: "linear" 
                      }}
                      style={{
                        backgroundSize: '200% 200%',
                      }}
                    />
                    <Clock className="w-4 h-4 text-gray-600 relative z-10" />
                  </motion.div>
                  
                  <span className="text-gray-500 font-medium">Thinking</span>
                  
                  <div className="flex items-center gap-1.5">
                    {[0, 1, 2, 3].map((i) => (
                      <motion.div
                        key={i}
                        className="relative"
                        animate={{
                          y: [0, -3, -6, -3, 0, 3, 6, 3, 0],
                        }}
                        transition={{ 
                          duration: 3.2,
                          repeat: Infinity,
                          delay: i * 0.2,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Main dot with smooth gradient */}
                        <motion.div
                          className="w-2 h-2 rounded-full overflow-hidden relative"
                          style={{
                            background: `linear-gradient(135deg, #374151 0%, #6b7280 50%, #9ca3af 100%)`,
                          }}
                        >
                          {/* Smooth gradient animation overlay */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            animate={{
                              x: ['-100%', '200%'],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                              ease: "linear",
                            }}
                          />
                        </motion.div>
                        
                        {/* Soft shadow for depth - no flashing */}
                        <div
                          className="absolute inset-0 w-2 h-2 rounded-full bg-gray-900/10 blur-[2px] translate-y-[1px]"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
              )}

              {/* Message Actions */}
              <AnimatePresence>
                {isHovered && !isLoading && (
                  <MessageActions message={message} />
                )}
              </AnimatePresence>
            </motion.div>

            {/* Message Metadata */}
            {message.metadata && !isLoading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ delay: 0.2 }}
                className={cn(
                  'mt-2 text-xs text-text-tertiary flex items-center gap-3',
                  isUser ? 'justify-end' : 'justify-start'
                )}
              >
                {message.metadata.model && (
                  <span>Model: {message.metadata.model}</span>
                )}
                {message.metadata.tokenCount && (
                  <span>Tokens: {message.metadata.tokenCount}</span>
                )}
                {message.metadata.processingTime && (
                  <span>Time: {message.metadata.processingTime}ms</span>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* User Avatar Placeholder */}
        {isUser && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1"
          >
            <User className="w-4 h-4 text-primary" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});

MessageBubble.displayName = 'MessageBubble';

export default MessageBubble; 