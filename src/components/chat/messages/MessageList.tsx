/**
 * MessageList Component
 * Enhanced scrollable message list with reliable scrolling behaviors
 * Features smooth scrolling, auto-scroll for new messages, and manual scroll override
 */

import React, { forwardRef, useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useChat } from '@/contexts/ChatContext';
import { MessageBubble } from './MessageBubble';
import { ChevronDown } from 'lucide-react';

interface MessageListProps {
  className?: string;
}

export const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ className }, ref) => {
    const { currentConversation, settings } = useChat();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const scrollAnchorRef = useRef<HTMLDivElement>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const lastMessageCountRef = useRef(0);

    // Simple scroll to bottom function
    const scrollToBottom = useCallback((smooth = true) => {
      if (scrollAnchorRef.current) {
        scrollAnchorRef.current.scrollIntoView({ 
          behavior: smooth ? 'smooth' : 'auto',
          block: 'end'
        });
      }
    }, []);

    // Check if we're near the bottom
    const checkScrollPosition = useCallback(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      const isNearBottom = distanceFromBottom < 100;

      setShowScrollButton(distanceFromBottom > 300);
      
      // If user scrolled near bottom, we can auto-scroll again
      if (isNearBottom) {
        setIsUserScrolling(false);
      }
    }, []);

    // Handle scroll events
    const handleScroll = useCallback(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      // If user is scrolling up, don't auto-scroll
      const { scrollTop, scrollHeight, clientHeight } = container;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      
      if (distanceFromBottom > 150) {
        setIsUserScrolling(true);
      }

      checkScrollPosition();
    }, [checkScrollPosition]);

    // Auto-scroll for new messages
    useEffect(() => {
      if (!currentConversation?.messages) return;

      const messageCount = currentConversation.messages.length;
      const isNewMessage = messageCount > lastMessageCountRef.current;
      lastMessageCountRef.current = messageCount;

      // Only auto-scroll if:
      // 1. There's a new message
      // 2. User is not manually scrolling
      if (isNewMessage && !isUserScrolling) {
        // Small delay to ensure message is rendered
        requestAnimationFrame(() => {
          scrollToBottom();
        });
      }
    }, [currentConversation?.messages?.length, isUserScrolling, scrollToBottom]);

    // Initial scroll on conversation change
    useEffect(() => {
      if (currentConversation?.id) {
        // Reset state for new conversation
        setIsUserScrolling(false);
        lastMessageCountRef.current = currentConversation.messages?.length || 0;
        
        // Scroll to bottom after a brief delay
        setTimeout(() => {
          scrollToBottom(false);
        }, 100);
      }
    }, [currentConversation?.id, scrollToBottom]);

    // Set up scroll listener
    useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;

      container.addEventListener('scroll', handleScroll, { passive: true });
      
      // Initial check
      checkScrollPosition();

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }, [handleScroll, checkScrollPosition]);

    if (!currentConversation) {
      return null;
    }

    const messages = currentConversation.messages;

    return (
      <div className={cn('relative h-full flex flex-col', className)}>
        {/* Scroll container - Fixed height with internal scroll */}
        <div 
          ref={scrollContainerRef}
          className={cn(
            'flex-1 overflow-y-auto overflow-x-hidden',
            'scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent',
            'hover:scrollbar-thumb-border-secondary'
          )}
        >
          <div className={cn(
            'max-w-4xl mx-auto px-4 sm:px-6 py-4',
            settings.appearance.messageSpacing === 'compact' && 'py-2',
            settings.appearance.messageSpacing === 'spacious' && 'py-8',
            'pb-20'
          )}>
            {/* Messages */}
            <AnimatePresence initial={false} mode="popLayout">
              {messages.map((message, index) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isFirst={index === 0}
                  isLast={index === messages.length - 1}
                  showTimestamp={settings.features.timestamps}
                  messageSpacing={settings.appearance.messageSpacing}
                />
              ))}
            </AnimatePresence>

            {/* Scroll anchor with increased height for more spacing */}
            <div ref={scrollAnchorRef} className="h-16" />
          </div>
        </div>

        {/* Scroll to bottom button */}
        <AnimatePresence>
          {showScrollButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsUserScrolling(false);
                scrollToBottom();
              }}
              className={cn(
                'absolute bottom-4 right-4 z-20',
                'w-10 h-10 rounded-full',
                'bg-primary text-primary-foreground',
                'shadow-lg hover:shadow-xl',
                'flex items-center justify-center',
                'transition-all duration-200'
              )}
              aria-label="Scroll to bottom"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

MessageList.displayName = 'MessageList';

export default MessageList; 