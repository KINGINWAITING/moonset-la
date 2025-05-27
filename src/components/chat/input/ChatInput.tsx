/**
 * ChatInput Component
 * Enhanced input area for sending messages to the AI
 * Features auto-resize, keyboard shortcuts, and professional styling
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useChat } from '@/contexts/ChatContext';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Square,
  Sparkles,
  Command,
  CornerDownLeft
} from 'lucide-react';

export const ChatInput: React.FC = () => {
  const { currentConversation, sendMessage, settings } = useChat();
  const [input, setInput] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  const adjustTextareaHeight = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = 'auto';
    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 160; // ~6 lines
    
    if (scrollHeight <= maxHeight) {
      textarea.style.height = `${scrollHeight}px`;
    } else {
      textarea.style.height = `${maxHeight}px`;
    }
  }, []);

  useEffect(() => {
    adjustTextareaHeight();
  }, [input, adjustTextareaHeight]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim() || !currentConversation) return;
    
    const messageContent = input.trim();
    setInput('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    
    await sendMessage(messageContent, currentConversation.id);
  }, [input, currentConversation, sendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
    
    // Clear input on Escape
    if (e.key === 'Escape') {
      setInput('');
      textareaRef.current?.blur();
    }
  }, [handleSubmit]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    // Handle file paste in the future
    const items = e.clipboardData?.items;
    if (!items) return;
    
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        // Handle image paste in future
        console.log('Image pasted:', item);
      }
    }
  }, []);

  const toggleRecording = useCallback(() => {
    setIsRecording(!isRecording);
    // Implement voice recording in future
  }, [isRecording]);

  const canSend = input.trim().length > 0 && currentConversation;

  if (!currentConversation) {
    return null;
  }

  return (
    <div className="border-t border-border bg-background">
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
          {/* Input Container */}
          <div className={cn(
            'relative rounded-2xl border transition-all duration-200',
            isFocused 
              ? 'border-primary shadow-lg shadow-primary/10' 
              : 'border-border hover:border-border-secondary',
            'bg-background'
          )}>
            {/* Textarea */}
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onPaste={handlePaste}
              placeholder="Ask about crypto markets, trading strategies, DeFi protocols, or MOONSET token..."
              className={cn(
                'w-full resize-none bg-transparent text-base leading-relaxed p-4 pr-24',
                'placeholder:text-text-tertiary text-text-primary',
                'focus:outline-none focus:ring-0 border-0',
                'min-h-[60px] max-h-[160px]',
                settings.appearance.fontSize === 'sm' && 'text-sm',
                settings.appearance.fontSize === 'lg' && 'text-lg',
                settings.appearance.fontFamily === 'mono' && 'font-mono',
                settings.appearance.fontFamily === 'serif' && 'font-serif'
              )}
              rows={1}
              disabled={!currentConversation}
            />

            {/* Action Buttons */}
            <div className="absolute right-2 bottom-2 flex items-center gap-1">
              {/* Attachment Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  'text-text-tertiary hover:text-text-secondary hover:bg-bg-secondary'
                )}
                title="Attach file (coming soon)"
                disabled
              >
                <Paperclip className="w-4 h-4" />
              </motion.button>

              {/* Voice Recording Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={toggleRecording}
                className={cn(
                  'p-2 rounded-lg transition-colors',
                  isRecording 
                    ? 'text-red-500 bg-red-50 dark:bg-red-950/20' 
                    : 'text-text-tertiary hover:text-text-secondary hover:bg-bg-secondary'
                )}
                title={isRecording ? "Stop recording" : "Start voice recording"}
                disabled
              >
                {isRecording ? (
                  <Square className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4" />
                )}
              </motion.button>

              {/* Send Button */}
              <motion.button
                whileHover={canSend ? { scale: 1.05 } : {}}
                whileTap={canSend ? { scale: 0.95 } : {}}
                type="submit"
                disabled={!canSend}
                className={cn(
                  'p-2 rounded-lg font-medium transition-colors flex items-center gap-2',
                  canSend
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm'
                    : 'bg-bg-tertiary text-text-tertiary cursor-not-allowed'
                )}
                title="Send message"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>

          {/* Helper Text */}
          <AnimatePresence>
            {isFocused && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="mt-2 px-2 flex items-center justify-between text-xs text-text-tertiary"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center gap-0.5">
                      <Command className="w-3 h-3" />
                      <span>/</span>
                      <CornerDownLeft className="w-3 h-3" />
                    </div>
                    <span>to send</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Shift</span>
                    <span>+</span>
                    <CornerDownLeft className="w-3 h-3" />
                    <span>for new line</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>AI-powered responses</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Character Counter */}
          {input.length > 500 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 px-2 text-right"
            >
              <span className={cn(
                'text-xs',
                input.length > 1000 ? 'text-red-500' : 'text-text-tertiary'
              )}>
                {input.length} / 2000
              </span>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatInput; 